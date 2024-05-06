'use client';

import {
  AppShell,
  Box,
  Burger,
  Button,
  Group,
  NavLink,
  Popover,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import {
  ExcalidrawFile,
  ExcalidrawLocally,
  getCurrentFile,
  getExcalidrawLocally,
  newFile,
  saveExcalidrawLocally,
} from '@/models/storage';
import { useEffect, useState } from 'react';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Excalidraw } from '@/components/ExcalidrawWrapper/ExcalidrawWrapper';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { FileName } from '@/components/FileName/FileName';
import { useDisclosure } from '@mantine/hooks';

export function Welcome() {
  const updateScene = (fileElements?: readonly ExcalidrawElement[]) => {
    const sceneData = {
      elements: fileElements || [],
    };

    excalidrawAPI.updateScene(sceneData);
  };

  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure();
  const { colorScheme } = useMantineColorScheme();
  const [data, setData] = useState<ExcalidrawLocally>();
  const [currentFile, setCurrentFile] = useState<ExcalidrawFile>();

  useEffect(() => {
    const localData = getExcalidrawLocally();
    setData(getExcalidrawLocally());

    setCurrentFile(getCurrentFile(localData));
  }, []);

  if (!data || !currentFile) {
    return null;
  }

  return (
    <AppShell
      header={{ height: 40 }}
      navbar={{
        width: 240,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between">
          <Group h="100%" px="md">
            <Popover>
              <Popover.Target>
                <Text variant="gradient" component="span">
                  Excalidraw locally
                </Text>
              </Popover.Target>
              <Popover.Dropdown>
                <Text c="dimmed" size="sm" component="span">
                  Excalidraw stores drawings locally in your browser.
                </Text>
              </Popover.Dropdown>
            </Popover>
            <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
            <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
          </Group>
          <Group>
            <FileName
              name={currentFile.fileName}
              onChange={(name) => {
                currentFile.fileName = name;
                saveExcalidrawLocally(data);
              }}
            />
            <Button variant="white" onClick={() => setCurrentFile(newFile(data))}>
              New
            </Button>
            <Button variant="transparent" onClick={() => {}}>
              Remove
            </Button>
          </Group>
          <Group h="100%" px="md">
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        Files
        {Object.keys(data.files).map((id) => (
          <NavLink
            label={data.files[id].fileName}
            key={id}
            active={currentFile.fileId === id}
            onClick={() => {
              data.currentFileId = id;
              saveExcalidrawLocally(data);
              setCurrentFile(data.files[id]);
              updateScene(data.files[id].elements);
            }}
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main pb="0" pl="0" pr="0" pt="40px">
        <Box style={{ height: 'calc(100vh - 40px)' }}>
          <Excalidraw
            initialData={{ elements: currentFile.elements }}
            excalidrawAPI={(api) => setExcalidrawAPI(api)}
            theme={colorScheme === 'dark' ? 'dark' : 'light'}
            onChange={(excalidrawElements) => {
              currentFile.elements = excalidrawElements;
              saveExcalidrawLocally(data);
            }}
          />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

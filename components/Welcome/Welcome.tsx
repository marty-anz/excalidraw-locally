'use client';

import { AppShell, Box, Burger, Group, Text, useMantineColorScheme } from '@mantine/core';
import { ExcalidrawLocally, getExcalidrawLocally, saveExcalidrawLocally } from '@/models/storage';
import { useEffect, useState } from 'react';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { FileName } from '../FileName/FileName';
import dynamic from 'next/dynamic';
import { useDisclosure } from '@mantine/hooks';

const Excalidraw = dynamic(async () => (await import('@excalidraw/excalidraw')).Excalidraw, {
  ssr: false,
});

export function Welcome() {
  const [opened, { toggle }] = useDisclosure(true);
  const { colorScheme } = useMantineColorScheme();
  const [data, setData] = useState<ExcalidrawLocally>();
  const [fileId, _setFileId] = useState<string>('untitled');
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    setData(getExcalidrawLocally());
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    setFileName(data.files[fileId].fileName);
  }, [fileId]);

  if (!data) {
    return null;
  }

  return (
    <AppShell
      header={{ height: 40 }}
      navbar={{ width: 0, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group justify="space-between">
          <Group h="100%" px="md">
            <Text inherit variant="gradient" component="span">
              Excalidraw locally
            </Text>

            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          </Group>
          <Group>
            <FileName
              name={fileName}
              onChange={(name) => {
                data.files[fileId].fileName = name;
                setFileName(name);
              }}
            />
          </Group>
          <Group h="100%" px="md">
            <ColorSchemeToggle />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main pb="0" pl="0" pr="0" pt="40px">
        <Box style={{ height: 'calc(100vh - 40px)' }}>
          <Excalidraw
            initialData={{
              elements: data.files[fileId].elements,
            }}
            theme={colorScheme === 'dark' ? 'dark' : 'light'}
            onChange={(excalidrawElements, _appState, _files) => {
              data.files[fileId].elements = excalidrawElements;
              saveExcalidrawLocally(data);
            }}
          />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
}

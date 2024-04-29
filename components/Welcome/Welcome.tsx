'use client';

import { AppShell, Box, Burger, Group, Text, useMantineColorScheme } from '@mantine/core';
import { useEffect, useState } from 'react';

import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import { Excalidraw } from '@excalidraw/excalidraw';
import { useDisclosure } from '@mantine/hooks';
import { ExcalidrawLocally, getExcalidrawLocally, saveExcalidrawLocally } from '@/models/storage';

export function Welcome() {
  const [opened, { toggle }] = useDisclosure(true);
  const { colorScheme } = useMantineColorScheme();
  const [data, setData] = useState<ExcalidrawLocally>();
  const [fileId, _setFileId] = useState<string>('untitled');

  useEffect(() => {
    setData(getExcalidrawLocally());
  }, []);

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
          <Group>{data.files[fileId].fileName}</Group>
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

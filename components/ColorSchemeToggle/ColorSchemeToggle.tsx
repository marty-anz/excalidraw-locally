'use client';

import { ActionIcon, rem, useMantineColorScheme } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';

export function ColorSchemeToggle() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  return (
    <ActionIcon
      size={36}
      variant="default"
      aria-label="Secure key"
      onClick={() => {
        if (colorScheme === 'light') {
          setColorScheme('dark');
        }
        if (colorScheme === 'dark') {
          setColorScheme('light');
        }
      }}
    >
      {colorScheme === 'light' && (
        <IconMoon
          style={{ width: rem(24), height: rem(24) }}
          stroke="1.5"
          color="currentColor"
          strokeLinejoin="round"
        />
      )}
      {colorScheme === 'dark' && (
        <IconSun
          style={{ width: rem(24), height: rem(24) }}
          stroke="1.5"
          color="currentColor"
          strokeLinejoin="round"
        />
      )}
    </ActionIcon>
  );
}

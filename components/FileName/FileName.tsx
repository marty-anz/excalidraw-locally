'use client';

import { Popover, Text, TextInput, useMantineTheme } from '@mantine/core';

import { IconBook } from '@tabler/icons-react';
import { useHover } from '@mantine/hooks';

type Props = {
  name: string;
  onChange: (fileName: string) => void;
};

export function FileName({ name, onChange }: Props) {
  const { hovered, ref } = useHover();
  const theme = useMantineTheme();

  return (
    <Popover width={360} position="bottom" withArrow shadow="md">
      <Popover.Target>
        <div ref={ref}>
          <Text
            p="5"
            style={{
              cursor: 'pointer',
              borderRadius: 6,
              background: hovered ? theme.colors.gray[2] : 'transparent',
            }}
          >
            {name}
          </Text>
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <TextInput
          value={name}
          onChange={(e) => onChange(e.target.value)}
          rightSection={<IconBook />}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

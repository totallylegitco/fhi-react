import { Stack, Text } from '@mantine/core';
import { IconChevronsDown } from '@tabler/icons-react';
import classes from './styles.module.css';

interface ScrollDownTagProps {
  label: string;
}

export function ScrollDownTag({ label }: ScrollDownTagProps) {
  return (
    <Stack align="center" mt={100} gap={4} className={classes.tagContainer}>
      <Text fw={700}>{label}</Text>
      <IconChevronsDown size={24} />
    </Stack>
  );
}

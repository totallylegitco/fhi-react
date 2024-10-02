import { Stack, Text, ActionIcon} from '@mantine/core';
import { IconChevronsDown } from '@tabler/icons-react';
import classes from './styles.module.css';

interface ScrollDownTagProps {
  label: string;
  targetId: string;
}

export function ScrollDownTag({ label, targetId }: ScrollDownTagProps) {
  const handleScrollDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      }
  }

  return (
    <Stack align="center" mt={100} gap={4} className={classes.tagContainer}>
      <Text fw={700}>{label}</Text>
      <ActionIcon
      onClick={handleScrollDown}
      variant="subtle"
      size="lg"
      className={classes.iconButton}
      >
        <IconChevronsDown size={24}/>
      </ActionIcon>
    </Stack>
  );
};

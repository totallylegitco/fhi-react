import { Title, Text, Anchor, Box, Stack } from '@mantine/core';
import classes from './styles.module.css';

interface TextBlurbProps {
  title: string;
  text: string;
}

export function TextBlurb({ title, text }: TextBlurbProps) {
  return (
    <div>
      <Title className={classes.title} ta="center" mt={100}>
        {title}
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={720} mx="auto" mt="xl">
        {text}
      </Text>
    </div>
  );
}

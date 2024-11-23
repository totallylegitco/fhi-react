import { Title, Text, Stack } from '@mantine/core';
import classes from './styles.module.css';

interface TextBlurbProps {
  title: string;
  text: string;
  additional?: string[];
}

export function TextBlurb({ title, text, additional }: TextBlurbProps) {
  return (
    <div>
      <Title className={classes.title} ta="center" mt={100}>
        {title}
      </Title>
      {text && (
        <Text c="dimmed" ta="center" size="lg" maw={720} mx="auto" mt="xl">
          {text}
        </Text>
      )}
      {additional && (
        <Stack maw={820} mx="auto" mt="sm">
          {additional.map((item, idx) => (
            <Text key={idx} c="dimmed" ta="left" size="md">
              {item}
            </Text>
          ))}
        </Stack>
      )}
    </div>
  );
}

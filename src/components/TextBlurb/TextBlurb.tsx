import { Title, Text } from '@mantine/core';
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
      <Text c="dimmed" ta="center" size="lg" maw={720} mx="auto" mt="lg">
        {text}
      </Text>
      {additional && (
        <>
          <Text c="dimmed" ta="left" size="md" maw={720} mx="auto" mt="lg" fw="bold">
            {additional[0]}
          </Text>
          {additional.slice(1).map((item, index) => (
            <Text key={index} c="dimmed" ta="left" size="md" maw={720} mx="auto">
              {item}
            </Text>
          ))}
        </>
      )}
    </div>
  );
}

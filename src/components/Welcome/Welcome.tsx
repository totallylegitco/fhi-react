import { Title, Text, Anchor, Box, Stack } from '@mantine/core';
import { IconChevronsDown } from '@tabler/icons-react';
import classes from './Welcome.module.css';
import { ScrollDownTag } from '../ScrollDownTag/ScrollDownTag';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        Fight Health Insurance
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={720} mx="auto" mt="xl">
        We'll help you to write an appeal to fight your health insurance denial. While an appeal is
        not always the first step in the health insurance appeal process we'll guide you through the
        options to fight back against health insurance denials. Almost all health plans are required
        to offer internal and external appeals and while they often make it confusing we can help.
      </Text>
      <ScrollDownTag label="How it works" />
    </>
  );
}

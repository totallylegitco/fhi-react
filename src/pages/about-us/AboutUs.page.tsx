import { Stack, Text } from '@mantine/core';
import { TextBlurb } from '@/components/TextBlurb/TextBlurb';
import { ABOUT_US_TEXT } from '@/pages/about-us/aboutUsText';

export function AboutUsPage() {
  return (
    <>
      <Stack gap="lg" maw={1440} mx="auto">
        <TextBlurb title="About Us" text="" />
        {ABOUT_US_TEXT.map((paragraph, index) => (
          <Text key={index} size="lg" ta="left" c="dimmed" mx="auto">
            {paragraph}
          </Text>
        ))}
      </Stack>
    </>
  );
}

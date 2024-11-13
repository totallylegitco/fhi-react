import { Button, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import { TextBlurb } from '../components/TextBlurb/TextBlurb';
import classes from './styles.module.css';
import { ScrollDownTag } from '@/components/ScrollDownTag/ScrollDownTag';

const WELCOME_TITLE = 'Fight Health Insurance';
const WELCOME_TEXT = `We'll help with writing your appeal to fight the health insurance denial. While an appeal is
        not always the first step in the appeal process, we'll guide you through
        options to fight back against health insurance denials. Most health plans are required
        to offer internal and external appeals and while they often make it confusing, we can help.`;
const UPLOAD_TEXT = `Navigating the insurance appeal process methodically is essential. The first step involves
        scanning your denial letter. This can be done through optical character recognition (OCR) either on your device/phone (recommended for increased privacy)
        or on our servers (more accurate). OCR makes the text understandable to machines, allowing our generative
        AI model able to produce potential appeals for you to choose from.`;

export function HomePage() {
  return (
    <>
      <div className={classes.snapSection}>
        <TextBlurb title={WELCOME_TITLE} text={WELCOME_TEXT} />
        <Center mt={80}>
          <Button
            radius={0}
            size="xl"
            className={classes.primaryColor}
            component={Link}
            to="/denial_questions"
          >
            Get Started
          </Button>
        </Center>
        <ScrollDownTag label="How it works" />
      </div>
      <div className={classes.snapSection}>
        <TextBlurb title="1. Upload your denial" text={UPLOAD_TEXT} />
        <ScrollDownTag label="Next step" />
      </div>
      <div className={classes.snapSection}>
        <TextBlurb title="2. Sit back and relax" text="Let some AI magic do the rest" />
        <ScrollDownTag label="Next step" />
      </div>
      <div className={classes.snapSection}>
        <TextBlurb title="3. Get your appeal" text="You will be given 3 options" />
        <Center mt={80}>
          <Button
            radius={0}
            size="xl"
            className={classes.primaryColor}
            component={Link}
            to="/denial_questions"
          >
            Get Started
          </Button>
        </Center>
      </div>
    </>
  );
}

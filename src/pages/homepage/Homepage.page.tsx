import { Button, Center } from '@mantine/core';
import { Link } from 'react-router-dom';
import { TextBlurb } from '../../components/TextBlurb/TextBlurb';
import classes from '../styles.module.css';
import { ScrollDownTag } from '../../components/ScrollDownTag/ScrollDownTag';
import { UPLOAD_TEXT, WELCOME_TEXT, WELCOME_TITLE, APPEAL_TEXT, OVERTURN_TEXT } from './Homepage';

export function HomePage() {
  return (
    <>
      <div className={classes.snapSection}>
        <TextBlurb title={WELCOME_TITLE} text={WELCOME_TEXT} />
        <Center mt={80}>
          <Button component={Link} to="/denial-questions">
            Get Started
          </Button>
        </Center>
        <ScrollDownTag label="How it works" />
      </div>
      <div className={classes.snapSection}>
        <TextBlurb title="1. Upload your denial" text={UPLOAD_TEXT} additional={OVERTURN_TEXT} />
        <ScrollDownTag label="Next step" />
      </div>
      <div className={classes.snapSection}>
        <TextBlurb title="2. Get your appeal" text={APPEAL_TEXT} />
        <Center mt={80}>
          <Button component={Link} to="/denial-questions">
            Get Started
          </Button>
        </Center>
      </div>
    </>
  );
}

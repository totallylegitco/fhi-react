// import { TextInput } from '@mantine/core';
import { ScrollDownTag } from '../../components/ScrollDownTag/ScrollDownTag';
import classes from '../styles.module.css';
import { TextBlurb } from '@/components/TextBlurb/TextBlurb';
import { PRO_TITLE, PRO_TEXT } from '@/pages/professional/professionalPage';

export function ProfessionalPage() {
  return (
    <>
      <div className={classes.snapSection}>
        <TextBlurb title={PRO_TITLE} text="" additional={PRO_TEXT} />
        <ScrollDownTag label="Sign up" />
      </div>
      <div className={classes.snapSection}>
        <div className="pro-form">
          <TextBlurb title="Professional Sign Up" text="" />
          {/* <TextInput label="First name" placeholder="Enter first name" mt="xs" /> */}
        </div>
        {/* <button type="button" className="btn btn-green">
          {'Submit'}
        </button> */}
      </div>
    </>
  );
}

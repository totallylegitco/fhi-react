import React, { useState, useRef, useEffect } from 'react';
import { Button, Center, TextInput, Stack, Text } from '@mantine/core';
import { TextBlurb } from '@/components/TextBlurb/TextBlurb';
import { FHI_CLIENT } from '@/logic/clients/FhiClient';
import classes from '@/pages/styles.module.css';

const DELETE_TEXT = 'To help us delete your data, please provide the email address you used.';
const DELETION_OUTCOMES = {
  success: 'Ok, data removed',
  failure: 'Failure, try again later',
};

export function DeleteDataPage() {
  const [email, setEmail] = useState('');
  const [outcome, setOutcome] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleFocus = () => {
      if (document.activeElement === emailInputRef.current) {
        setIsInputFocused(true);
      } else {
        setIsInputFocused(false);
      }
    };
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleFocus);
    return () => {
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleFocus);
    };
  }, []);

  const isFloating =!!email.trim() || isInputFocused;

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await FHI_CLIENT.deleteData({ email });
      setOutcome(DELETION_OUTCOMES.success);
    } catch (error) {
      setOutcome(DELETION_OUTCOMES.failure);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <TextBlurb title="Delete your Data" text={DELETE_TEXT} />
      <Center mt={80}>
        <Stack gap="md" align="center">
          <div className="delete-data-email-input">
            <TextInput
              label="Email"
              classNames={classes}
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
              ref={emailInputRef}
              mt="md"
              data-floating={isFloating}
              labelProps={{ 'data-floating': isFloating }}
            />
          </div>
          <div className="delete-button">
            <Button
              radius={0}
              size="xl"
              className={classes.primaryColor}
              onClick={handleDelete}
              loading={isLoading}
            >
              Delete
            </Button>
          </div>
          {outcome && (
            <Text size="lg" color={outcome === DELETION_OUTCOMES.success? 'teal' : 'red'}>
              {outcome}
            </Text>
          )}
        </Stack>
      </Center>
    </div>
  );
}

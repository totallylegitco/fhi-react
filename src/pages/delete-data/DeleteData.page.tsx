import { useState } from 'react';
import { Button, Center, TextInput, Stack, Text } from '@mantine/core';
import { TextBlurb } from '@/components/TextBlurb/TextBlurb';
import classes from '@/pages/styles.module.css'

const DELETE_TEXT = `To help us delete your data, please provide the email address you used.`
const DELETION_MESSAGE = `Any data stored in our database and associated with your e-mail has been removed`

export function DeleteDataPage() {
    const [email, setEmail] = useState<string>("");
    const [emailDeleted, setEmailDeleted] = useState(false);
    const [focused, setFocused] = useState(false);
    const floating = email.trim().length !== 0 || focused || undefined;
    const [message, setMessage] = useState<string | null>(null);

    return (
        <>
            <div>
            <TextBlurb title='Delete your Data' text={DELETE_TEXT} />
            <Center mt={80}>
                <Stack gap="md" align="center">
                <div className="delete-data-email-input">
                    <TextInput
                        label="Email "
                        classNames={classes}
                        value={email}
                        onChange={(event) => setEmail(event.currentTarget.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        mt="md"
                        data-floating={floating}
                        labelProps={{ 'data-floating': floating }}
                    />
                </div>
                <div className="delete-button">
                    <Button
                        radius={0}
                        size="xl"
                        className={classes.primaryColor}
                    >
                    Delete
                    </Button>
                </div>
                </Stack>
            </Center>
            </div>
        </>
    )
}

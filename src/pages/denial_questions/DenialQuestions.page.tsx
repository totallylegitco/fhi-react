import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { CreateDenialRequestOptions, FHI_CLIENT } from '@/logic/clients/FhiClient';
import { TextBlurb } from '@/components/TextBlurb/TextBlurb';
import classes from '@/pages/styles.module.css';

interface Question {
  id?: string;
  text: string;
  type: 'text' | 'textarea' | 'checkbox' | 'none';
  name: string;
  options?: { label: string; value: string }[];
  additional?: string;
}

// Array of arrays, where each inner array contains questions to be displayed together
const questions: Question[][] = [
  [
    {
      id: 'greeting',
      name: 'greeting',
      text: 'Thanks for choosing to use Fight Health Insurance! We do some things we think is cool-ish to try and improve your data privacy (read the privacy techniques and our privacy policy here). You can also just jump right in and get started!',
      type: 'none',
    },
  ],
  [
    {
      id: '1',
      text: 'First Name',
      type: 'text',
      name: 'firstName',
    },
    {
      id: '2',
      text: 'Last Name',
      type: 'text',
      name: 'lastName',
    },
  ],
  [
    {
      id: '3',
      text: 'Your Street Address (e.g. 283 24th St)',
      type: 'text',
      name: 'streetAddress',
    },
    {
      id: '4',
      text: 'Your Zip Code (e.g. 94103)',
      type: 'text',
      name: 'zip',
    },
  ],
  //... Add more question sets here...
  [
    {
      id: 'denialText',
      text: 'Your Insurance Denial (Remove personally identifiable information (PII) as we store for machine learning and may review)',
      type: 'textarea',
      name: 'denialText',
    },
  ],
  [
    {
      id: 'healthHistory',
      text: 'Your Relevant Health History (e.g. transgender, type 2 diabetes, fibromyalgia, celiac, etc.)',
      type: 'textarea',
      name: 'healthHistory',
      additional:
        'Do not include any personally identifiable information (like your name, address, etc.) If you do not know (or do not want to answer) you can skip this question.',
    },
  ],
  [
    {
      id: 'privacy',
      text: 'I have read and understand the privacy policy:',
      type: 'checkbox',
      name: 'isPrivacy',
      options: [{ label: 'Agree', value: 'true' }],
    },
    {
      id: 'tos',
      text: 'I agree to the terms of service:',
      type: 'checkbox',
      name: 'isTos',
      options: [{ label: 'Agree', value: 'true' }],
    },
  ],
  //... Continue with the rest of your question sets...
];

export function DenialQuestions() {
  const [currentQuestionSetIndex, setCurrentQuestionSetIndex] = useState(0);
  const [answers, setAnswers] = useState<CreateDenialRequestOptions>({
    zip: '',
    isPii: false,
    isTos: false,
    isPrivacy: false,
    denialText: '',
    healthHistory: '',
    email: '',
    isOkToStoreRawEmail: false,
    isOkToUseExternalModels: false,
  });
  const [loading, setIsLoading] = useState(false);
  const [denialId, setDenialId] = useState('');
  const [semiSekret, setSemiSekret] = useState('');
  const [yourState, setYourState] = useState('');
  const [procedure, setProcedure] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState(null);
  const [skipHealthHistory, setSkipHealthHistory] = useState(false);

  const currentQuestionSet = questions[currentQuestionSetIndex];

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { target } = e;
    const answerValue =
      target instanceof HTMLInputElement && target.type === 'checkbox'
        ? target.checked
        : target.value;
    if (target.name) {
      setAnswers((prevAnswers) => ({ ...prevAnswers, [target.name]: answerValue }));
    }
  };

  const handleNextQuestionSet = () => {
    if (currentQuestionSetIndex < questions.length - 1) {
      setCurrentQuestionSetIndex(currentQuestionSetIndex + 1);
    } else {
      // Submit the form when all question sets are answered
      handleSubmitForm();
    }
  };

  const handleSkipHealthHistory = () => {
    setSkipHealthHistory(true);
    setCurrentQuestionSetIndex(currentQuestionSetIndex + 1);
  };

  const handleSubmitForm = async () => {
    setIsLoading(true);
    try {
      const response = await FHI_CLIENT.createDenial(answers);
      setDenialId(response.denial_id);
      setSemiSekret(response.semi_sekret);
      setYourState(response.your_state || 'N/A');
      setProcedure(response.procedure || 'N/A');
      setDiagnosis(response.diagnosis || 'N/A');
    } catch (errorDetails: any) {
      setError(errorDetails.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (denialId) {
    return (
      <div>
        <h2>Denial Created Successfully!</h2>
        <p>Denial ID: {denialId}</p>
        <p>Semi Sekret: {semiSekret}</p>
        <p>Your State: {yourState}</p>
        <p>Procedure: {procedure}</p>
        <p>Diagnosis: {diagnosis}</p>
      </div>
    );
  }

  return (
    <div>
      {currentQuestionSetIndex === 0 ? (
        <TextBlurb title="Upload your Denial" text={questions[0][0].text} />
      ) : (
        <TextBlurb title="Upload your Denial" text={''} />
      )}
      <section className="scan-section mt-2">
        <div className="container">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {currentQuestionSet.map(
            (question) =>
              question.id !== 'greeting' && (
                <div key={question.id} className="form-group">
                  <label>{question.text}</label>
                  <br />
                  {question.name && (
                    <>
                      {question.id === 'healthHistory' && !skipHealthHistory ? (
                        <>
                          <textarea
                            name={question.name}
                            id={question.name}
                            value={String(
                              question.name in answers
                                ? answers[question.name as keyof CreateDenialRequestOptions]
                                : ''
                            )}
                            onChange={handleAnswerChange}
                            style={{ width: '100%' }}
                            rows={20}
                            className="form-control"
                          />
                          {question.additional && (
                            <p className="mt-2 text-sm text-gray-600">{question.additional}</p>
                          )}
                          <div className="mt-2 d-flex justify-content-between">
                            <Button
                              radius="md"
                              size="lg"
                              className={classes.secondaryColor}
                              onClick={handleSkipHealthHistory}
                              style={{ textTransform: 'uppercase' }}
                            >
                              Skip
                            </Button>
                          </div>
                        </>
                      ) : question.type === 'text' ? (
                        <>
                          <input
                            type="text"
                            name={question.name}
                            id={question.name}
                            value={String(
                              question.name in answers
                                ? answers[question.name as keyof CreateDenialRequestOptions]
                                : ''
                            )}
                            onChange={handleAnswerChange}
                            className="form-control"
                          />
                        </>
                      ) : question.type === 'checkbox' ? (
                        question.options?.map((option) => (
                          <div key={option.value}>
                            <input
                              type="checkbox"
                              id={question.name}
                              name={question.name}
                              value={option.value}
                              checked={
                                (question.name in answers
                                  ? answers[question.name as keyof CreateDenialRequestOptions]
                                  : '') === option.value
                              }
                              onChange={handleAnswerChange}
                              className="form-check-input"
                            />
                            <label htmlFor={question.name} className="form-check-label">
                              {option.label}
                            </label>
                          </div>
                        ))
                      ) : (
                        <input
                          type="text"
                          id={question.name}
                          name={question.name}
                          value={String(
                            question.name in answers
                              ? answers[question.name as keyof CreateDenialRequestOptions]
                              : ''
                          )}
                          onChange={handleAnswerChange}
                          className="form-control"
                        />
                      )}
                    </>
                  )}
                  {!question.name && (
                    // Optional: Render something for non-interactive questions
                    <div></div>
                  )}
                </div>
              )
          )}
          <Button
            radius="md"
            size="lg"
            className={classes.primaryColor}
            onClick={handleNextQuestionSet}
            style={{ textTransform: 'uppercase' }}
          >
            {currentQuestionSetIndex === 0
              ? 'Start'
              : currentQuestionSetIndex < questions.length - 1
                ? 'Next'
                : 'Submit'}
          </Button>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { CreateDenialRequestOptions, FHI_CLIENT } from '@/logic/clients/FhiClient';

interface Question {
  id?: string;
  text: string;
  type: 'text' | 'textarea' | 'checkbox' | 'none';
  name?: string;
  options?: { label: string; value: string }[];
}

// Array of arrays, where each inner array contains questions to be displayed together
const questions: Question[][] = [
  [ { id: "greating",
      text: 'Thanks for choosing to use Fight Health Insurance! We do some things we think is cool-ish to try and improve your data privacy, you ay wish to read the privacy techniques and our privacy policy. You can also just jump right in and press next to get started',
      type: 'none',
  }],
  [
    {
      id: '1',
      text: 'First Name:',
      type: 'text',
      name: 'firstName',
    },
    {
      id: '2',
      text: 'Last Name:',
      type: 'text',
      name: 'lastName',
    },
  ],
  [
    {
      id: '3',
      text: 'Your Street Address (e.g., 283 24th St):',
      type: 'text',
      name: 'streetAddress',
    },
    {
      id: '4',
      text: 'Your Zip Code:',
      type: 'text',
      name: 'zip',
    },
  ],
  //... Add more question sets here...
  [
    {
      id: 'denialText',
      text: 'Your Insurance Denial:',
      type: 'textarea',
      name: 'denialText',
    },
  ],
  [
    {
      id: 'healthHistory',
      text: 'Your Relevant Health History (optional, remove PII first):',
      type: 'textarea',
      name: 'healthHistory',
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
  const [answers, setAnswers] = useState<CreateDenialRequestOptions>({});
  const [loading, setIsLoading] = useState(false);
  const [denialId, setDenialId] = useState('');
  const [semiSekret, setSemiSekret] = useState('');
  const [yourState, setYourState] = useState('');
  const [procedure, setProcedure] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState(null);

  const currentQuestionSet = questions[currentQuestionSetIndex];

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    const answerValue = type === 'checkbox'? checked : value;
    setAnswers((prevAnswers) => ({...prevAnswers, [name]: answerValue }));
  };

  const handleNextQuestionSet = () => {
    if (currentQuestionSetIndex < questions.length - 1) {
      setCurrentQuestionSetIndex(currentQuestionSetIndex + 1);
    } else {
      // Submit the form when all question sets are answered
      handleSubmitForm();
    }
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
      <h1>Upload Your Health Insurance Denial</h1>
      <section className="scan-section mt-2">
	<div className="container">
	  {error && <p style={{ color: 'red' }}>{error}</p>}
	  {currentQuestionSet.map((question) => (
	    <div key={question.id} className="form-group">
	      <label htmlFor={question.name} className="form-label">
		{question.text}
	      </label>
	      <br />
	      {question.type === 'textarea'? (
		<textarea
		  name={question.name}
		  id={question.name}
		  value={answers[question.name] || ''}
		  onChange={handleAnswerChange}
		  style={{ width: '100%' }}
		  rows={20}
		  className="form-control"
		/>
	      ) : question.type === 'none'? (
		  <div></div>
	      ) : question.type === 'checkbox'? (
		question.options?.map((option) => (
		  <div key={option.value}>
		    <input
		      type="checkbox"
		      id={question.name}
		      name={question.name}
		      value={option.value}
		      checked={answers[question.name] === option.value}
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
		  value={answers[question.name] || ''}
		  onChange={handleAnswerChange}
		  className="form-control"
		/>
	      )}
	    </div>
	  ))}
	  <button type="button" className="btn btn-green" onClick={handleNextQuestionSet}>
	    {currentQuestionSetIndex < questions.length - 1? 'Next' : 'Submit'}
	  </button>
	</div>
      </section>
    </div>
  );
}

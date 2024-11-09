// src/pages/upload-denial/UploadDenial.page.tsx

import React, { useState } from 'react';
import { CreateDenialRequestOptions, FHI_CLIENT } from '@/logic/clients/FhiClient';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'checkbox';
  name: string;
  options?: { label: string; value: string }[];
}

const questions: Question[] = [
    {
	id: '0',
	text: 'Thanks for choosing to use Fight Health Insurance! We do some things we think is cool-ish to try and improve your data privacy, you ay wish to read the privacy techniques and our privacy policy. You can also just jump right in and press next to get started',
	type: 'none',
    },
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
  {
    id: '3',
    text: 'Your Street Address (e.g., 283 24th St):',
    type: 'text',
    name: 'streetAddress',
  },
  //... Add more questions here...
  {
    id: 'denialText',
    text: 'Your Insurance Denial:',
    type: 'textarea',
    name: 'denialText',
  },
  {
    id: 'healthHistory',
    text: 'Your Relevant Health History (optional, remove PII first):',
    type: 'textarea',
    name: 'healthHistory',
  },
  {
    id: 'privacy',
    text: 'I have read and understand the privacy policy:',
    type: 'checkbox',
    name: 'isPrivacy',
    options: [{ label: 'Agree', value: 'true' }],
  },
  //... Continue with the rest of your questions...
];

export function DenialQuestions() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<CreateDenialRequestOptions>({});
  const [loading, setIsLoading] = useState(false);
  const [denialId, setDenialId] = useState('');
  const [semiSekret, setSemiSekret] = useState('');
  const [yourState, setYourState] = useState('');
  const [procedure, setProcedure] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState(null);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target;
    const answerValue = type === 'checkbox'? checked : value;
    setAnswers((prevAnswers) => ({...prevAnswers, [name]: answerValue }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Submit the form when all questions are answered
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
	  <div className="form-group">
	    <label htmlFor={currentQuestion.name} className="form-label">
	      {currentQuestion.text}
	    </label>
	    <br />
	    {currentQuestion.type === 'textarea'? (
	      <textarea
		name={currentQuestion.name}
		id={currentQuestion.name}
		value={answers[currentQuestion.name] || ''}
		onChange={handleAnswerChange}
		style={{ width: '100%' }}
		rows={20}
		className="form-control"
	      />
	    ) : currentQuestion.type === 'none'? (
		<div></div>
	    ) : currentQuestion.type === 'checkbox'? (
	      currentQuestion.options?.map((option) => (
		<div key={option.value}>
		  <input
		    type="checkbox"
		    id={currentQuestion.name}
		    name={currentQuestion.name}
		    value={option.value}
		    checked={answers[currentQuestion.name] === option.value}
		    onChange={handleAnswerChange}
		    className="form-check-input"
		  />
		  <label htmlFor={currentQuestion.name} className="form-check-label">
		    {option.label}
		  </label>
		</div>
	      ))
	    ) : (
	      <input
		type="text"
		id={currentQuestion.name}
		name={currentQuestion.name}
		value={answers[currentQuestion.name] || ''}
		onChange={handleAnswerChange}
		className="form-control"
	      />
	    )}
	  </div>
	  <button type="button" className="btn btn-green" onClick={handleNextQuestion}>
	    {currentQuestionIndex < questions.length - 1? 'Next' : 'Submit'}
	  </button>
	</div>
      </section>
    </div>
  );
}

// src/pages/upload-denial/UploadDenial.page.tsx

import React, { useState } from 'react';
import { CreateDenialRequestOptions, FHI_CLIENT } from '@/logic/clients/FhiClient';

export function DenialQuestions() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [zip, setZip] = useState('');
  const [isPii, setIsPii] = useState(false);
  const [isTos, setIsTos] = useState(false);
  const [isPrivacy, setIsPrivacy] = useState(false);
  const [denialText, setDenialText] = useState('');
  const [healthHistory, setHealthHistory] = useState('');
  const [email, setEmail] = useState('');
  const [storeRawEmail, setStoreRawEmail] = useState(false);
  const [useExternalModels, setUseExternalModels] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [denialId, setDenialId] = useState('');
  const [semiSekret, setSemiSekret] = useState('');
  const [yourState, setYourState] = useState('');
  const [procedure, setProcedure] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [error, setError] = useState(null);

  const handleCreateDenial = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const denialRequest: CreateDenialRequestOptions = {
        zip,
        isPii,
        isTos,
        isPrivacy,
        denialText,
        healthHistory,
        email,
        isOkToStoreRawEmail: storeRawEmail,
        isOkToUseExternalModels: useExternalModels,
      };
      const response = await FHI_CLIENT.createDenial(denialRequest);
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

  return (
    <div>
      <h1>Upload Your Health Insurance Denial</h1>
      <section className="scan-section mt-2">
        <div className="container">
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button
            id="clear_local"
            className="btn btn-green"
            onClick={() => window.localStorage.clear()}
            type="button"
          >
            Clear Page Local Storage (remove your name / address from cookie type storage)
          </button>
          <h4>Not transferred to server (stored in your browser)</h4>
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label htmlFor="store_fname" className="form-label">
                  First Name:
                </label>
                <br />
                <input
                  type="text"
                  id="store_fname"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="form-control"
                />
                <br />
              </div>
              <div className="col-md-4">
                <label htmlFor="store_lname" className="form-label">
                  Last Name:
                </label>
                <br />
                <input
                  type="text"
                  id="store_lname"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                />
                <br />
              </div>
              <div className="col-md-8">
                <label htmlFor="store_street" className="form-label">
                  Your Street Address (e.g., 283 24th St)
                </label>
                <br />
                <input
                  type="text"
                  id="store_street"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  className="form-control"
                />
                <br />
              </div>
            </div>
            <button id="scrub" className="btn btn-green" type="button">
              Try and Remove Name And Address From Scanned Text
            </button>
          </div>
          <h4>Transfered to server -- we store*</h4>
          <form
            onSubmit={handleCreateDenial}
            id="fuck_health_insurance_form"
            encType="multipart/form-data"
          >
            <div className="form-group">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <br />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                <br />
              </div>
            </div>
            <h4>
              Your Insurance Denial & Info Transfered to server -- REMOVE PII FIRST! -- we store for
              ML + may review
            </h4>
            <label htmlFor="denial_text" className="form-label">
              Your Insurance Denial
            </label>
            <br />
            <textarea
              name="denial_text"
              id="denial_text"
              value={denialText}
              onChange={(e) => setDenialText(e.target.value)}
              style={{ width: '100%' }}
              rows={20}
              form="fuck_health_insurance_form"
              placeholder="Health Insurance Denial Goes Here"
              className="form-control"
            />
            <button id="scrub-2" className="btn btn-green" type="button">
              Try and Remove Name And Address From Scanned Text
            </button>
            <h4>
              Optional: Your Health History (do not include PII) -- we store for ML + may review
            </h4>
            <label htmlFor="health_history" className="form-label">
              Your Relevant Health History (optional) remove PII first
            </label>
            <br />
            <textarea
              name="health_history"
              id="health_history"
              value={healthHistory}
              onChange={(e) => setHealthHistory(e.target.value)}
              style={{ width: '100%' }}
              rows={20}
              form="fuck_health_insurance_form"
              placeholder="Health History Goes Here"
              className="form-control"
            />
            <h4>Optional: Plan Documents (like Summary Plan Description)</h4>
            <label className="custom-file-label" htmlFor="plan_documents">
              Optional: Plan Documents
            </label>
            <br />
            <input id="plans_documents" type="file" name="plan_documents" multiple />
            <h4>
              Transfered to server, we try not to store outside of session (we do store the state)
            </h4>
            <div className="form-group">
              <div className="col-md-4">
                <label htmlFor="store_zip" className="form-label">
                  Your Zip Code
                </label>
                <br />
                <input
                  type="text"
                  id="store_zip"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="form-control"
                />
                <br />
              </div>
            </div>
            <h4>Policies</h4>
            <div className="form-group">
              <input
                type="checkbox"
                id="personal-only"
                name="personal-only"
                className="form-check-input"
              />
              <label htmlFor="personal-only" className="form-check-label">
                I am aware that <b>this is for personal use only</b>{' '}
                <a href="/">
                  for those interested in a professional version
                  (doctor/therapist/practioner/office/hospital/etc.) click here to learn more
                </a>
              </label>
              <br />
              <input
                type="checkbox"
                id="privacy"
                name="privacy"
                checked={isPrivacy}
                onChange={(e) => setIsPrivacy(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="privacy" className="form-check-label">
                I have read and understand the{' '}
                <a className="link" href="/">
                  privacy policy
                </a>
              </label>
              <br />
              <input
                type="checkbox"
                id="pii"
                name="pii"
                checked={isPii}
                onChange={(e) => setIsPii(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="pii" className="form-check-label">
                I have removed my PII (Personal Identifiable Information) from the text area above
              </label>
              <br />
              <input
                type="checkbox"
                id="tos"
                name="tos"
                checked={isTos}
                onChange={(e) => setIsTos(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="tos" className="form-check-label">
                I <a href="/">agree to the terms of service</a> and will only use this website to
                generate my own health insurance appeals and will not use this website to treat,
                diagnose any disease or condition or assist in either of those.
              </label>
              <br />
              Optional:
              <br />
              <input
                type="checkbox"
                id="store_raw_email"
                name="store_raw_email"
                checked={storeRawEmail}
                onChange={(e) => setStoreRawEmail(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="store_raw_email" className="form-check-label">
                Store my raw e-mail to follow up with me (for the duration of automated follow-ups +
                30 days)*
              </label>
              <br />
              <input
                type="checkbox"
                id="use_external_models"
                name="use_external_models"
                checked={useExternalModels}
                onChange={(e) => setUseExternalModels(e.target.checked)}
                className="form-check-input"
              />
              <label htmlFor="use_external_models" className="form-check-label">
                Increase the number of possible appeals and use external models.
                <b>This is not required and involves sharing your data with 3rd parties</b>
                subject to their own TOS potentially including Octoai, Perplexity, TogetherAI, etc.
              </label>
              <br />
            </div>
            <div style={{ visibility: 'hidden', color: 'red' }} id="email_error">
              We need your e-mail to proceed, this allows us to delete your data later on request.
            </div>
            <div style={{ visibility: 'hidden', color: 'red' }} id="agree_chk_error">
              Can&apos;t proceed as you didn&apos;t agree to the terms.
            </div>
            <div style={{ visibility: 'hidden', color: 'red' }} id="pii_error">
              Can&apos;t proceed as you didn&apos;t check that you had removed your PII from the
              text area.
            </div>
            <button type="submit" className="btn btn-green" id="submit" disabled={loading}>
              {loading ? 'Creating Denial...' : 'Create Denial'}
            </button>
          </form>
          {denialId && (
            <div>
              <h2>Denial Created Successfully!</h2>
              <p>Denial ID: {denialId}</p>
              <p>Semi Sekret: {semiSekret}</p>
              <p>Your State: {yourState}</p>
              <p>Procedure: {procedure}</p>
              <p>Diagnosis: {diagnosis}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// appealPageState.ts

interface AppealPageState {
  currentStep: number;
  totalSteps: number;
  questions: any[]; // Adjust the type based on your question object structure
  answers: { [key: string]: any }; // Dynamic object for answers
  denialId: string;
  email: string;
  semiSekret: string;
}

const initialState: AppealPageState = {
  currentStep: 1,
  totalSteps: 0,
  questions: [],
  answers: {},
  denialId: '',
  email: '',
  semiSekret: '',
};

class AppealPageStateManager {
  private state: AppealPageState = initialState;

  public updateQuestions(questions: any[]) {
    this.state.questions = questions;
    this.state.totalSteps = questions.length;
  }

  public setCurrentStep(step: number) {
    this.state.currentStep = step;
  }

  public updateAnswer(questionName: string, answer: any) {
    this.state.answers[questionName] = answer;
  }

  public getState(): AppealPageState {
    return this.state;
  }

  public getDenialId(): string {
    return this.state.denialId;
  }

  public getEmail(): string {
    return this.state.email;
  }

  public getSemiSekret(): string {
    return this.state.semiSekret;
  }

  public getAnswers(): { [key: string]: any } {
    return this.state.answers;
  }

  public getCurrentStep(): number {
    return this.state.currentStep;
  }

  public getTotalSteps(): number {
    return this.state.totalSteps;
  }

  public getQuestions(): any[] {
    return this.state.questions;
  }
}

const appealPageState = new AppealPageStateManager();

export default appealPageState;

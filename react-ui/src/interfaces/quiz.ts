export enum QuizState {
  intro = "intro",
  quiz = "quiz",
  results = "results",
  dashboard = "dashboard",
}

export enum Archetype {
  diyer = "diyer",
  ponderer = "ponderer",
  workarounder = "workarounder",
  boss = "boss",
}

export enum QuestionType {
  list = "list",
  card = "card",
}

export interface IQuizData {
  questions: IQuestion[];
}

export interface IStartSessionResponse {
  sessionId: string;
}

export interface IQuestion {
  question: string;
  type: QuestionType;
  answers: IAnswer[];
}

export interface IAnswer {
  id: string;
  questionId: string;
  answer: string;
  points: IAnswerPoints[];
  imgUrl?: string;
}

export interface IAnswerPoints {
  archetype: Archetype;
  amount: number;
}

export interface ISubmitAnswers {
  answers: IAnswerReq[];
}

export interface IAnswerReq {
  questionId: string;
  answerId: string;
}

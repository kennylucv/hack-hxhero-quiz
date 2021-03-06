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
  id: string;
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

export interface ISessionData {
  archetype: Archetype;
  scores: IScore;
}

export interface IScore {
  action: number;
  knowledge: number;
  risk: number;
  price: number;
}

export interface IPieData {
  diyer: number;
  ponderer: number;
  workarounder: number;
  boss: number;
}

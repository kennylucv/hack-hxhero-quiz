import { ISubmitAnswers } from "../interfaces/quiz";

const submitAnswers = async (
  sessionId: string,
  answers: ISubmitAnswers
): Promise<void> => {
  const url = "/api/submit-answers";
  const body = JSON.stringify({
    answers: answers.answers,
    sessionId,
  });
  const method = "PUT";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await (await fetch(url, { body, method, headers })).json();
    console.log("res", res);
  } catch (e) {
    console.log(e);
  }
};

export default submitAnswers;

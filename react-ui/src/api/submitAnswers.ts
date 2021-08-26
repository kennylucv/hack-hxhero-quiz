import { ISubmitAnswers } from "../interfaces/quiz";

const submitAnswers = async (answers: ISubmitAnswers) => {
  const url = "/api/answers";
  const body = JSON.stringify(answers);
  const method = "POST";
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

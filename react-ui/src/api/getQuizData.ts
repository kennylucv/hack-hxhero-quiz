import { IQuizData } from "../interfaces/quiz";

const getQuizData = async (): Promise<IQuizData | undefined> => {
  const url = "/api/questions";
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = (await (
      await fetch(url, { method, headers })
    ).json()) as IQuizData;
    console.log("res", res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default getQuizData;

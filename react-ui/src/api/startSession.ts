import { IStartSessionResponse } from "../interfaces/quiz";

const startSession = async (): Promise<IStartSessionResponse | undefined> => {
  const url = "/api/start-session";
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = (await (
      await fetch(url, { method, headers })
    ).json()) as IStartSessionResponse;
    console.log("res", res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default startSession;

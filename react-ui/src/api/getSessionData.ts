import { ISessionData } from "../interfaces/quiz";

const getSessionData = async (
  sessionId: string
): Promise<ISessionData | undefined> => {
  const url = `/api/get-session/${sessionId}`;
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await (await fetch(url, { method, headers })).json();
    return res.session as ISessionData;
  } catch (e) {
    console.log(e);
  }
};

export default getSessionData;

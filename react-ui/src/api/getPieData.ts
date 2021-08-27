import { IPieData } from "../interfaces/quiz";

interface IPieDataResponse {
  pieData: IPieData;
}

const getPieData = async (): Promise<IPieDataResponse | undefined> => {
  const url = "/api/get-pieData";
  const method = "GET";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = (await (
      await fetch(url, { method, headers })
    ).json()) as IPieDataResponse;
    console.log("res", res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default getPieData;

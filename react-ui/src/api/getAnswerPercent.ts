export interface IGetAnswerPercentResults {
  results : {
    [key: string]: IAnswerData;
  }
  totalCount: number;
}

export interface IAnswerData {
  count: number;
  answer: string;
}

const getAnswerPercent = async (
  questionId: string,
  archetype: string,
): Promise<IGetAnswerPercentResults | undefined> => {
  const url = "/api/get-answer-percent";
  const body = JSON.stringify({
    questionId,
    archetype,
  });
  console.log("submitAnswers", { body });
  const method = "POST";
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const res = await (await fetch(url, { body, method, headers })).json() ;
    console.log("res", res.results);
    return res as IGetAnswerPercentResults
  } catch (e) {
    console.log(e);
  }
};

export default getAnswerPercent;

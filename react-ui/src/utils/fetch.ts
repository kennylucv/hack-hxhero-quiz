/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
enum FetchMethod {
  get = "GET",
  post = "POST",
}

const fetchUtil = async (
  url: string,
  body: any,
  method: FetchMethod
): Promise<any> => {
  const headers = {
    "Content-Type": "application/json",
  };

  try {
    const res = await (await fetch(url, { body, method, headers })).json();
    console.log("res", res);
    return res;
  } catch (e) {
    console.log(e);
  }
};

export default fetchUtil;

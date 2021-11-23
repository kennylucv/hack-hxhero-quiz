
const submitEmail = async (
  sessionId: string
): Promise<void> => {
  const url = "/api/submit-email";
  const body = JSON.stringify({
    email: 'true',
    sessionId,
  });
  console.log("submitted email");
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

export default submitEmail;

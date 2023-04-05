export const changePassword = async (token: string, password: string): Promise<string> => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: token, password: password })
  });

  if (res.status !== 200) {
    throw new Error(`Error code ${res.status}`);
  }
  const data = await res.json();
  return data.status;
};
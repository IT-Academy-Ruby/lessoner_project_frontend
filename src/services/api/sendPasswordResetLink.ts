const sendPasswordResetLink = async (email: string): Promise<string> => {
  const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/password/forgot`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email })
  });

  if (res.status === 404) {
    return "User not found";
  } else if (res.status !== 200) {
    throw new Error(`Error code ${res.status}`);
  }

  const data = await res.json();
  return data.alert;
};

export { sendPasswordResetLink };
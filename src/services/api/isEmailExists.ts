import { BACKEND_URL } from "../../constants";

const isEmailExists = async (email: string): Promise<boolean> => {
  const res = await fetch(`${BACKEND_URL}/check_email?email=${email}`);

  if (!res.ok) {
    throw new Error(`Error code ${res.status}`);
  }

  const data = await res.json();
  return data.email_exists;
};

export { isEmailExists };
const isEmailExists = async (email: string) => {
  //   const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/check_email?email=${email}`);
  //
  //   if (!res.ok) {
  //     throw new Error(`Error code ${res.status}`);
  //   }
  //
  //   const data = await res.json();
  //   return data.email_exists;
};

export { isEmailExists };

type requestType = "GET" | "POST" | "PUT" | "DELETE";

const requestApi = async (url: string, typeRequest: requestType = "GET", value?: object) => {

  const token = localStorage.getItem("JWT");

  if (typeRequest === "GET") {
    return await fetch(url, {
      headers: new Headers({"Authorization": `Bearer ${token}`})
    });
  }
  return await fetch(url, {
    method: typeRequest, headers: new Headers({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8"
    }),
    body: JSON.stringify(value),
  });
};

export default requestApi;
type requestType = "GET" | "POST" | "PUT" | "DELETE";

export const requestApi = async (
  url: string,
  typeRequest: requestType = "GET",
  value?: object,
  file?: FileList
) => {
  const formData = new FormData();
  file ? formData.append("image", file[0]) : null;

  const token = sessionStorage.getItem("JWT") || localStorage.getItem("JWT");
  if (typeRequest === "GET") {
    return await fetch(url, {headers: new Headers({"Authorization": `Bearer ${token}`})});
  }
  return await fetch(url, {
    method: typeRequest,
    headers: new Headers(
      {"Authorization": `Bearer ${token}`, "Content-Type": "application/json;charset=utf-8"}
    ),
    body: JSON.stringify(value) || formData,

  });
};
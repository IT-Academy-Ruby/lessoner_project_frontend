/**
 * @deprecated seems like it's not needed and should be removed
 */
const getData = async () => {
  await fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
};
export { getData };

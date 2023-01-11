import requestApi from "../../../../services/request";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SelectCategory = () => {
  // eslint-disable-next-line prefer-const
  let id = useParams();
  console.log(id);
  const getCategoryUrl = `${process.env.REACT_APP_BACKEND_URL}/categories/${id.id}`;
  console.log(getCategoryUrl);
  useEffect(() => {
    const catigoriesItems = requestApi(getCategoryUrl,"GET").then((response) => {
      return response.json();
    }).then((json) => {
      console.log(json);
      return json; 
    }).catch(error => {
      console.log(error);
    });
    console.log(catigoriesItems);
  }, []);
 
  return (
    <div>
        Category id={id.id}
    </div>
  );
};

export default SelectCategory;
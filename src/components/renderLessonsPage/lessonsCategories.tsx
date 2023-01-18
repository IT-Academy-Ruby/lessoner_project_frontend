import { useEffect, useState } from "react";
import { LessonsPage } from "./lessonsPage";
import requestApi from "../../services/request";
import { useParams } from "react-router-dom";

interface CategoryParams {
  name: string;
}

export const LessonsCategories = () => {
  const id = useParams();
  const getCategoryUrl = `${process.env.REACT_APP_BACKEND_URL}/categories/${id.id}`;
  const [category, setCategory] = useState<CategoryParams | null>(null);

  console.log(category?.name);

  useEffect(() => {
    requestApi(getCategoryUrl, "GET")
      .then((response) => response.json())
      .then((category) => setCategory(category))
      .catch((error) => console.log(error));
  }, [getCategoryUrl]);

  return <LessonsPage isHomePage={true} category={category?.name} />;
};

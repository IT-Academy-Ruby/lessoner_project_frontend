import "./index.scss";
import {useEffect, useState} from "react";
import {FormattedMessage} from "react-intl";
import {SKELETON_AMOUT} from "../../../../constants";
import SkeletonCategory from "../../../SkeletonCategory";
import UserCategory from "../../../UserCategory";
import axios from "axios";

export interface Category {
  id: number;
  image_url: string;
  name: string;
  description: string;
}

const CategoriesUser = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchCategory() {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/categories`,);
      setCategories(data.records);
      setIsLoading(false);
    } catch (error) {
      alert("Error getting categories!!!");
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  const categorySet = categories.map((obj) => (
    <UserCategory
      key={obj.id}
      id={obj.id}
      imagePreview={obj.image_url}
      name={obj.name}
      description={obj.description}
    />
  ));

  const skeleton = [...new Array(SKELETON_AMOUT)].map((_, index) =>
    <SkeletonCategory key={index}/>);

  return (
    <div className="wrapper__categories">
      <FormattedMessage id="app.categories"/>
      <div className="categories__block">
        {isLoading ? skeleton : categorySet}
      </div>
    </div>
  );
};

export default CategoriesUser;

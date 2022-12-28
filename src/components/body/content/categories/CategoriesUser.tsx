import "./index.scss";
import CategoryIT from "../../../../assets/category_it.png";
import {FormattedMessage} from "react-intl";
import UserCategory from "../../../UserCategory";
import {useAppSelector} from "../../../../store/hooks";

const Categories = () => {
  const allCategories = useAppSelector((state) => state.categories.categories);

  return (
    <div className="wrapper__categories">
      <FormattedMessage id="app.categories"/>
      <div className="categories__block">
        {allCategories.map(category =>
          category.status==="active"?
          <UserCategory
            imagePreview={CategoryIT}
            name={category.name}
            text={category.description}
            bgColor="blue"
            key={category.name}/>:null
        )}
      </div>
    </div>
  );
};
export default Categories;
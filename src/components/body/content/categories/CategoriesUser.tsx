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
          <div className="user_wrapper" key={category.name}>
            <UserCategory
              imagePreview={CategoryIT}
              name={category.name}
              text={category.description}
              bgColor="blue"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Categories;
import "./categoriesUser.scss";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {FormattedMessage} from "react-intl";
import {Link} from "react-router-dom";
import {SKELETON_AMOUT} from "../../../../constants";
import SkeletonCategory from "../../../SkeletonCategory";
import UserCategory from "../../../UserCategory";
import {selectedCategory} from "../../../../store/categorySlice/categorySlice";
import {useEffect} from "react";

export interface Category {
  id: number;
  image_url: string;
  name: string;
  description: string;
};

const CategoriesUser = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.categories.categories);
  const skeleton = useAppSelector(state => state.categories.skeleton);

  const shadowSkeleton = [...new Array(SKELETON_AMOUT)].map((_, index) =>
    <SkeletonCategory key={index}/>);

  return (
    <div className="field__categories">
      <h1 className="categories__title">
        <FormattedMessage id="app.categories"/>
      </h1>
      <div className="categories__user">
        {categories.length > 1 && categories.map((obj) => (
          <Link to={`/`} key={obj.id} onClick={() => dispatch(selectedCategory({name: obj.name, id: obj.id}))}>
            <UserCategory
              key={obj.id}
              id={obj.id}
              imagePreview={obj.image_url}
              name={obj.name}
              description={obj.description}
            />
          </Link>))}
        {skeleton && shadowSkeleton}
      </div>
    </div>
  );
};

export default CategoriesUser;

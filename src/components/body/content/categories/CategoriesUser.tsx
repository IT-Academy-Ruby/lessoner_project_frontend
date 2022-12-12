import {useAppSelector} from "../../../../store/hooks";
import IT from "../../../icons/examplImage/IT.svg";
import Loader from "../../../Loader";

const CategoriesUser = () => {
  const allCategories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.loading);

  return (
    <div className="categories-user">
      {loading && <Loader/>}
      {allCategories.map(category => category.status === "active" &&
        <div key={category.name} className="category-user">
          <img src={IT} alt="IT" className="background-category"/>
          <div className="inform-user">
            <div className="inform-for-hover"></div>
            <h2 className="category-user-name">{category.name}</h2>
            <p className="category-description description-user">{category.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}
export default CategoriesUser;
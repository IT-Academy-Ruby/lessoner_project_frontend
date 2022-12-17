import {
  MouseEvent, useEffect, useState
} from "react";
import {archiveCategory, getCategory} from "../../../../store/categorySlice/categorySlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import Add from "../../../icons/add.svg";
import Delete from "../../../icons/delete.svg";
import Edit from "../../../icons/edit.svg";
import IT from "../../../icons/examplImage/IT.svg";
import Loader from "../../../Loader";
import {useNavigate} from "react-router-dom";

const CategoriesAdmin=()=>{
  const [isGetCategory, setIsGetCategory] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.loading);

  useEffect(()=>{
    dispatch(getCategory());
  },[dispatch]);

  const handleEdit = (event: MouseEvent) => {
    navigate(`/categories/updateCategory/${event.currentTarget.id}`);
  };

  const handleDelete = async (category:
    { id: number, name: string, description: string, status: string }
  ) => {
    await dispatch(archiveCategory(category));
    dispatch(getCategory());
    setIsGetCategory(!isGetCategory);
  };
  return(
    <>
      {loading && <Loader/>}
      {allCategories.map(category =>
        <button key={category.id} className="row-category tab-category">
          <div className="category-text">{category.id}</div>
          <img src={IT} alt={category.name} className="category-img"/>
          <div className="category-name">{category.name}</div>
          <div className="category-text category-description">{category.description}</div>
          <div className="category-date">{new Date(category.created_at).toLocaleDateString()}</div>
          <div className="category-text">{category.status}</div>
          <div className="category-icon">
            <img
              src={Edit}
              alt="edit"
              className="icon-edit"
              id={category.id.toString()}
              onClick={handleEdit}
            />
            <img
              src={category.status === "active" ? Delete : Add}
              alt={category.status === "active" ? "delete" : "add"}
              className="icon-delete"
              id={category.id.toString()}
              onClick={() => handleDelete(category)}/>
          </div>
        </button>
      )}
    </>
  );
};
export default CategoriesAdmin;
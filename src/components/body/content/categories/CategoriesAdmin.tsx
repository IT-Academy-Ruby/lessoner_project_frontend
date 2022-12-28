import {
  MouseEvent, useEffect, useState
} from "react";
import {
  archiveCategory, deleteCategory, getCategory
} from "../../../../store/categorySlice/categorySlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import Add from "../../../icons/add.svg";
import Delete from "../../../icons/delete.svg";
import Edit from "../../../icons/edit.svg";
import Loader from "../../../Loader";
import ModalCategory from "./actions/ModalCategory";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

const CategoriesAdmin = () => {
  const [isClose, setIsClose] = useState(false);
  const [idCategory, setIdCategory]=useState(0);
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const handleEdit = (event: MouseEvent) => {
    navigate(`/categories/updateCategory/${event.currentTarget.id}`);
  };

  const handleDelete = async (category: {
    id: number, name: string, description: string, status: string, amount_lessons: number
  }) => {
    setIdCategory(category.id);
    category.amount_lessons > 0 ?
      await dispatch(archiveCategory(category)) : setIsClose(true);
  };

  return (
    <>
      {loading && <Loader/>}
      { allCategories.map(category =>
        <button key={category.id} className="row-category tab-category">
          <div className="category-text">{category.id}</div>
          <img src={category.image_url} alt={category.name} className="category-img"/>
          <div className="category-name">{category.name}</div>
          <div className="category-text category-description">{category.description}</div>
          <div className="category-date">{new Date(category.created_at).toLocaleDateString()}</div>
          <div className="category-text">{category.amount_lessons}</div>
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
      {isClose && <ModalCategory
        setIsClose={setIsClose}
        onClickYes={async () => {
          await dispatch(deleteCategory(idCategory));
          dispatch(getCategory());
          setIsClose(false);
        }}
        title={intl.formatMessage({id: "app.categories.textDelete"})}
      />}
    </>
  );
};
export default CategoriesAdmin;
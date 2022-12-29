import {
  MouseEvent, useEffect, useState
} from "react";
import { archiveCategory, getCategory } from "../../../../store/categorySlice/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Add from "../../../icons/add.svg";
import Delete from "../../../icons/delete.svg";
import Edit from "../../../icons/edit.svg";
import IT from "../../../icons/examplImage/IT.svg";
import Loader from "../../../Loader";
import getWindowDimensions from "../../../../helpers/getWindowDimensions";
import styles from "../../../../constants.module.scss";
import { useNavigate } from "react-router-dom";

const CategoriesAdmin = () => {
  const [isGetCategory, setIsGetCategory] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.loading);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  const [pageSize, setPageSize] = useState(getWindowDimensions());

  const resizeHanlder = () => {
    const pageSize = getWindowDimensions();
    setPageSize(pageSize);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHanlder);

    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };
  }, []);

  const handleEdit = (event: MouseEvent) => {
    navigate(`/categories/updateCategory/${event.currentTarget.id}`);
  };

  const handleDelete = async (category:
    {
      id: number, name: string, description: string, status: string, amount_lessons: number
    }
  ) => {
    await dispatch(archiveCategory(category));
    dispatch(getCategory());
    setIsGetCategory(!isGetCategory);
  };

  const categoryRow = (category:
    {
      id: number, name: string, description: string, status: string, created_at: string,
      amount_lessons: number
    }) => {
    if (pageSize.width < parseInt(styles.maxWidthPhone)) {
      return (
        <button key={category.id} className="tile-category tab-category">
          <div className="category-image-name-id-actions">
            <img src={IT} alt={category.name} className="category-img" />
            <div className="category-name-id-actions">
              <div className="category-name-id">
                <div className="category-name">{category.name}</div>
                <div className="category-text">{category.id}</div>
              </div>
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
                  onClick={() => handleDelete(category)} />
              </div>
            </div>
          </div>
          <div className="category-text category-description">{category.description}</div>
          <div className="category-date-videos">
            <div className="category-date">
              Date of adding: {new Date(category.created_at).toLocaleDateString()}
            </div>
            <div className="category-text">{category.amount_lessons} videos</div>
          </div>
        </button>
      );
    } else if (pageSize.width < parseInt(styles.maxWidthTablet) &&
      pageSize.width > parseInt(styles.maxWidthPhone)) {
      return (
        <button key={category.id} className="row-category tab-category">
          <div >
            <div className="category-name category-doubled-cell">{category.name}</div>
            <div className="category-text">{category.id}</div>
          </div>
          <img src={IT} alt={category.name} className="category-img" />
          <div className="category-text category-description">{category.description}</div>
          <div>
            <div className="category-text category-doubled-cell">{category.amount_lessons}</div>
            <div className="category-date">
              {new Date(category.created_at).toLocaleDateString()}
            </div>
          </div>
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
              onClick={() => handleDelete(category)} />
          </div>
        </button>
      );
    } else {
      return (
        <button key={category.id} className="row-category tab-category">
          <div className="category-text">{category.id}</div>
          <img src={IT} alt={category.name} className="category-img" />
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
              onClick={() => handleDelete(category)} />
          </div>
        </button>
      );
    }
  };

  return (
    <>
      {loading && <Loader />}
      {allCategories.map(category => categoryRow(category))}
    </>
  );
};
export default CategoriesAdmin;
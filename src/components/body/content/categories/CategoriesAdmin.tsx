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
import getWindowDimensions from "../../../../helpers/getWindowDimensions";
import styles from "../../../../constants.module.scss";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

const CategoriesAdmin = () => {

  const [isClose, setIsClose] = useState(false);
  const [idCategory, setIdCategory] = useState(0);
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state) => state.categories.categories);
  const loading = useAppSelector((state) => state.categories.loading);
  const formatter = new Intl.DateTimeFormat("ru");

  useEffect(() => {
    dispatch(getCategory());
    window.addEventListener("resize", resizeHanlder);

    return () => {
      window.removeEventListener("resize", resizeHanlder);
    };

  }, [dispatch]);

  const [pageSize, setPageSize] = useState(getWindowDimensions());

  const resizeHanlder = () => {
    const pageSize = getWindowDimensions();
    setPageSize(pageSize);
  };

  const handleEdit = (event: MouseEvent) => {
    navigate(`/categories/updateCategory/${event.currentTarget.id}`);
  };

  const handleDelete = async (category:
  {
    id: number, name: string, description: string, status: string, amount_lessons: number
  }
  ) => {
    console.log(category.amount_lessons)
    setIdCategory(category.id);
    if (category.amount_lessons > 0) {
      await dispatch(archiveCategory(category));
    } else {
      setIsClose(true);
    }
  };

  const categoryRow = (category:
  {
    id: number, image_url: string, name: string, description: string, status: string,
    created_at: string, amount_lessons: number
  }) => {
    if (pageSize.width < parseInt(styles.maxWidthPhone)) {
      return (
        <button key={category.id} className="tile-category tab-category">
          <div className="category-image-name-id-actions">
            <img src={category.image_url} alt={category.name} className="category-img"/>
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
                  onClick={() => handleDelete(category)}/>
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
          <div>
            <div className="category-name category-doubled-cell">{category.name}</div>
            <div className="category-text">{category.id}</div>
          </div>
          <img src={category.image_url} alt={category.name} className="category-img"/>
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
              onClick={() => handleDelete(category)}/>
          </div>
        </button>
      );
    } else {
      return (
        <button key={category.id} className="row-category tab-category">
          <div className="category-text">{category.id}</div>
          <img src={category.image_url} alt={category.name} className="category-img"/>
          <div className="category-name">{category.name}</div>
          <div className="category-text category-description">{category.description}</div>
          <div className="category-date">{formatter.format(new Date(category.created_at))}</div>
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
      );
    }
  };

  return (
    <>
      {loading && <Loader/>}
      {allCategories.length > 1 && allCategories.map(category => categoryRow(category))}
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
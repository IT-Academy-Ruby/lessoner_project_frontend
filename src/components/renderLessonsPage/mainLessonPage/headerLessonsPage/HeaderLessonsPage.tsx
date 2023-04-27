import "./headerLessonsPage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {getLessons, resetLessons} from "../../../../store/lessonSlice/lessonSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import {Button} from "../../../Button";
import {LESSONSPAGE} from "../../../../constants";
import Plus from "../../../icons/add.svg";
import {SortButton} from "../../SortButton";
import {selectedCategory} from "../../../../store/categorySlice/categorySlice";
import {useNavigate} from "react-router-dom";

type HeaderLessonsPageProps = {
  type: string;
}

export const HeaderLessonsPage = ({type}: HeaderLessonsPageProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const defaultButton = {
    name: intl.formatMessage({id: "app.lessons.statusAllLessons"}),
    class: "mainLessons",
    method: "",
    status: "active"
  };

  const sortMainLesson = [
    defaultButton,
    {
      name: intl.formatMessage({id: "app.lessons.statusNew"}),
      class: "mainLessons",
      method: "created_at",
      status: "active"
    },
    {
      name: intl.formatMessage({id: "app.lessons.statusPopular"}),
      class: "mainLessons",
      method: "views_count",
      status: "active"
    }
  ];

  const sortMyStudio = [
    defaultButton,
    {
      name: intl.formatMessage({id: "app.lessons.statusActive"}),
      class: "mainLessons",
      method: "",
      status: "active"
    },
    {
      name: intl.formatMessage({id: "app.lessons.statusArchived"}),
      class: "mainLessons",
      method: "",
      status: "archived"
    },
  ];
  const defaultCategory = {name: intl.formatMessage(
    {id: "app.lessons.categoryAllCategories"}), id: ""};
  const [data, setData] = useState(defaultButton);
  const [numberPage, setNumberPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState(defaultCategory);
  const categories = useAppSelector(state => state.categories.categories);
  const chosenCategory = useAppSelector(state => state.categories.selectedCategory);
  const countPages = useAppSelector(state => state.lessons.pagy_metadata.count_pages);
  const user = useAppSelector(state => state.login.user.name);
  const valueCategories = [defaultCategory, ...categories.map(category => {
    return {name: category.name, id: category.id.toString()};
  })];

  const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    valueCategories.forEach(category => {
      if (category.name === event.target.value) {
        dispatch(selectedCategory({name: category.name, id: category.id}));
      }
      if (defaultCategory.name === event.target.value) {
        dispatch(selectedCategory(defaultCategory));
      }
    });
  };

  const requestLessons = async (page: number, idCategory: number) => {
    await dispatch(getLessons({
      myStudio: type === "myStudio",
      page: page,
      category: idCategory,
      sortValue: data.method,
      perPage: LESSONSPAGE,
      status: data.status
    }));
    setNumberPage(numberPage + 1);
  };

  useEffect(() => {
    if ((loading && countPages === 0) || (loading && countPages >= numberPage)) {
      requestLessons(numberPage, +chosenCategory.id);
      setLoading(false);
    }
    /* eslint-disable-next-line */
  }, [data, loading, numberPage]);

  useEffect(() => {
    if (category.name !== defaultCategory.name) {
      setCategory(defaultCategory);
    }
    /* eslint-disable-next-line */
  }, [type]);

  useEffect(() => {
    if (category.name === defaultCategory.name) {
      dispatch(resetLessons());
      requestLessons(1, NaN);
      dispatch(selectedCategory(category));
    } else {
      requestLessons(1, +chosenCategory.id);
    }
    /* eslint-disable-next-line */
  }, [category]);

  useEffect(() => {
    setCategory(chosenCategory);
    setNumberPage(1);
    /* eslint-disable-next-line */
  }, [chosenCategory]);

  useEffect(() => {
    if (type === "myStudio" && !sessionStorage.getItem("JWT") && !localStorage.getItem("JWT")) {
      navigate("/user/sign_in");
    }
  }, [navigate, type, user]);

  const scrollHandler = (): void => {
    if ((document.documentElement.scrollHeight
      - document.documentElement.scrollTop
      - window.innerHeight) < 300) {
      setLoading(true);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <div className="headerLessons">
      {type === "myStudio" && <div className="headerLessons__head">
        <h1 className="headerLessons__title">
          <FormattedMessage id={"app.lessonsPageMyLessons"}/>
        </h1>
        <Button
          buttonType="button"
          buttonText={intl.formatMessage({id: "app.Add new lesson"})}
          className="button-login-category"
          onClick={() => navigate("/myStudio/add_new_lesson")}
          buttonImage={Plus}
          imageStyle="icon-button"/>
      </div>}
      {(type === "lessonsPage" || type === "myStudio") && <div className="headerLessons__buttons">
        <SortButton
          object={type === "lessonsPage" ? sortMainLesson : sortMyStudio}
          setStatus={setData}
          status={data}
          setNumberPage={setNumberPage}
          setLoading={setLoading}
        />
      </div>}
      <select
        value={category.name}
        className="headerLessons__select"
        onChange={(event) => {
          selectCategory(event);
        }}>
        {valueCategories.map(category =>
          <option key={category.id} id={category.id}>
            {category.name}
          </option>)}
      </select>
    </div>
  );
};
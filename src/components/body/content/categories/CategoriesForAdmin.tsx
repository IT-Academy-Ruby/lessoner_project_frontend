import "./categories.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import Button from "../../../Button";
import CategoriesAdmin from "./CategoriesAdmin";
import getWindowDimensions from "../../../../helpers/getWindowDimensions";
import styles from "../../../../constants.module.scss";
import {useNavigate} from "react-router-dom";

const CategoriesForAdmin = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [pageSize, setPageSize] = useState(getWindowDimensions());
  const admin = useAppSelector(state => state.userDecodedName.session.admin);

  useEffect(() => {
    if (!sessionStorage.getItem("JWT") && !localStorage.getItem("JWT")) {
      navigate("/user/sign_in");
    }
  }, [navigate, admin, dispatch]);

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

  const columnsHeaders = () => {
    if (pageSize.width < parseInt(styles.maxWidthTablet) &&
      pageSize.width > parseInt(styles.maxWidthPhone)) {
      return (
        <div className="row-category categories-header">
          {[
            intl.formatMessage({id: "app.categories.categoryID"}),
            intl.formatMessage({id: "app.categories.image"}),
            intl.formatMessage({id: "app.categories.description"}),
            intl.formatMessage({id: "app.categories.amountDate"}),
            intl.formatMessage({id: "app.categories.actions"}),
          ].map(column => <div key={column} className="column-name">{column}</div>)}
        </div>
      );
    } else if (pageSize.width > parseInt(styles.maxWidthTablet)) {
      return (
        <div className="row-category categories-header">
          {[
            "ID",
            intl.formatMessage({id: "app.categories.image"}),
            intl.formatMessage({id: "app.categories.category"}),
            intl.formatMessage({id: "app.categories.description"}),
            intl.formatMessage({id: "app.categories.date"}),
            intl.formatMessage({id: "app.categories.amount"}),
            intl.formatMessage({id: "app.categories.actions"}),
          ].map(column => <div key={column} className="column-name">{column}</div>)}
        </div>
      );
    }
  };

  const addCategory = () => {
    navigate("/categories/addCategory");
  };

  return (
    <div className="categories">
      {
        admin && <div className="categories">
          <div className="category-header">
            <h1 className="category-title">
              <FormattedMessage id="app.categories"/>
            </h1>
            <Button
              className="button-register"
              buttonText={intl.formatMessage((pageSize.width > parseInt(styles.maxWidthPhone)) ?
                {id: "app.button.categories.Add"} : {id: "app.button.categories.New"})}
              buttonType="button"
              onClick={addCategory}
            />
          </div>
          <div className="tab">
            {columnsHeaders()}
            <CategoriesAdmin/>
          </div>
        </div>
      }
    </div>
  );
};
export default CategoriesForAdmin;

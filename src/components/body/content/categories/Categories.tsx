import "./categories.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useState} from "react";
import Button from "../../../Button";
import CategoriesAdmin from "./CategoriesAdmin";
import CategoriesUser from "./CategoriesUser";
import {getCategory} from "../../../../store/categorySlice/categorySlice";
import {useNavigate} from "react-router-dom";

const Categories = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const admin = useAppSelector(state => state.userDecodedName.session.admin);

  useEffect(() => {
    if (admin) {
      dispatch(getCategory());
    }
  }, [admin, dispatch]);

  const nameColomn = [
    "ID",
    intl.formatMessage({id: "app.categories.image"}),
    intl.formatMessage({id: "app.categories.category"}),
    intl.formatMessage({id: "app.categories.description"}),
    intl.formatMessage({id: "app.categories.date"}),
    intl.formatMessage({id: "app.categories.amount"}),
    intl.formatMessage({id: "app.categories.actions"}),
  ];

  const addCategory = () => {
    navigate("/categories/addCategory");
  };

  return (
    <div className="categories">
      <div className="category-header">
        <h1 className="category-title">
          <FormattedMessage id="app.categories"/>
        </h1>
        {admin && <Button
          className="button-register"
          buttonText={intl.formatMessage({id: "app.button.categories"})}
          buttonType="button"
          onClick={addCategory}
        />}
      </div>
      <div className="tab">
        {admin && <div className="row-category">
          {nameColomn.map(column => <div key={column} className="column-name">{column}</div>)}
        </div>}
        {admin && <CategoriesAdmin/>}
        {!admin && <CategoriesUser/>}
      </div>
    </div>
  );
};
export default Categories;

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
  const [isAdmin, setIsAdmin] = useState(false);
  const user = useAppSelector(state => state.userDecodedName.session);

  useEffect(() => {
    if (user.name === "admin" && user.email === "lessonerteam@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      dispatch(getCategory());
    };
  }, [isAdmin,user,dispatch]);

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
        <Button
          className="button-login"
          buttonText={intl.formatMessage({id: "app.button.categories"})}
          buttonType="button"
          onClick={addCategory}
        />
      </div>
      <div className="tab">
        <div className="row-category">
          {nameColomn.map(column => <div key={column} className="column-name">{column}</div>)}
        </div>
        {isAdmin && <CategoriesAdmin/>}
        <CategoriesUser/>
      </div>
    </div>
  );
};
export default Categories;

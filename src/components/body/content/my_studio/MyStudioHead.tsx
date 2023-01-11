import "./myStudioHead.scss";
import { FormattedMessage, useIntl } from "react-intl";
import Add from "../../../icons/add.svg";
import Button from "../../../Button";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; 

const MyStudioHead = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [statusActive, setStatusActive] = useState("All lessons");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryActive, setCategoryActive] = useState("All categories");

  const handleStatusToggle = (status: string) => {
    setStatusActive(status);
  };

  const handleCategoryToggle = (event:React.ChangeEvent) => {
    const category = event.target as HTMLInputElement;
    setCategoryActive(category.value);
  };

  const STATUSES = [
    intl.formatMessage({ id: "app.myStudio.statusAllLessons" }),
    intl.formatMessage({ id: "app.myStudio.statusActive" }),
    intl.formatMessage({ id: "app.myStudio.statusArchived" }),
  ];
  const CATEGORIES = [
    intl.formatMessage({ id: "app.myStudio.categoryAllLessons" }),
    intl.formatMessage({ id: "app.myStudio.categoryIT" }),
    intl.formatMessage({ id: "app.myStudio.categoryMusic" }),
    intl.formatMessage({ id: "app.myStudio.categoryDesign" }),
  ];
  const elementsStatus = STATUSES.map((status) => {
    return (
      <div key={status} className="mystudiohead__lessons-item">
        <span
          onClick={() => handleStatusToggle(status)}
          className={classNames(
            status === statusActive && "mystudiohead__lessons-item-active"
          )}
        >
          {status}
          {status === statusActive && (
            <div className="mystudiohead__lessons-item-underline"></div>
          )}
        </span>
      </div>
    );
  });
  const elementsCategory = CATEGORIES.map((category) => {
    return (     
      <option key={category} id={category}>
        {category}
      </option>
    );
  });
  
  return (
    <div className="mystudiohead__wrapper">
      <div className="mystudiohead__head">
        <p className="mystudiohead__title">
          <FormattedMessage id="app.My lessons" />
        </p>
        <div className="mystudiohead__button">
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({ id: "app.button.addNewLesson" })}
            className="button__fs16"
            buttonImage={Add}
            imageStyle="mystudiohead__svg-add"
            onClick={() => navigate("/myStudio/add_new_lesson")}
          />
        </div>
      </div>
      <div className="mystudiohead__nav">
        <div className="mystudiohead__lessons">{elementsStatus}</div>
        <div className="mystudiohead__categories">
          <select
            name=""
            className="mystudiohead_select"
            onChange={(event) => handleCategoryToggle(event)}
          >
            {elementsCategory}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MyStudioHead;

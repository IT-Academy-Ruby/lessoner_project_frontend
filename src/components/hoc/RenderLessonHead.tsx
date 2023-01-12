import "../body/content/my_studio/myStudioHead.scss";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Button";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { FC, useState } from "react";

interface RenderLessonHeadProps {
  statuses: string[];
  categories: string[];
  isButton: boolean;
  buttonType: any;
  buttonText: string;
  buttonClassName: string;
  buttonImage: any;
  buttonImageStyle: string;
  buttonNavigatePath: string;
  setStatusActive: string;
  setCategoryActive: string;
  classNameWrapper: string;
  classNameHead: string;
  classNameTitle: string;
  classNameButton: string;
  classNameNav: string;
  classNameStatus: string;
  classNameCategories: string;
  classNameCategoriesSelect: string;
  classNameLessonItem: string;
  classNameLessonItemActive: string;
  classNameLessonItemUnderline: string;
  title?: string;
}

export const RenderLessonHead: FC<RenderLessonHeadProps> = (renderProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const [statusActive, setStatusActive] = useState(renderProps.setStatusActive);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [categoryActive, setCategoryActive] = useState(renderProps.setCategoryActive);

  const handleStatusToggle = (status: string) => {
    setStatusActive(status);
  };

  const handleCategoryToggle = (event: React.ChangeEvent) => {
    const category = event.target as HTMLInputElement;
    setCategoryActive(category.value);
  };

  const STATUSES = renderProps.statuses;
  const CATEGORIES = renderProps.categories;

  const elementsStatus = STATUSES.map((status: string) => {
    return (
      <div key={status} className={renderProps.classNameLessonItem}>
        <span
          onClick={() => handleStatusToggle(status)}
          className={classNames(
            status === statusActive && `${renderProps.classNameLessonItemActive}`
          )}
        >
          {status}
          {status === statusActive && (
            <div className={renderProps.classNameLessonItemUnderline}></div>
          )}
        </span>
      </div>
    );
  });
  const elementsCategory = CATEGORIES.map((category: string) => {
    return (
      <option key={category} id={category}>
        {category}
      </option>
    );
  });

  return (
    <div className={renderProps.classNameWrapper}>
      <div className={renderProps.classNameHead}>
        <p className={renderProps.classNameTitle}>
          <FormattedMessage id={renderProps.title} />
        </p>
        <div className={renderProps.classNameButton}>
          {renderProps.isButton && (
            <Button
              buttonType={renderProps.buttonType}
              buttonText={intl.formatMessage({ id: `${renderProps.buttonText}` })}
              className={renderProps.buttonClassName}
              buttonImage={renderProps.buttonImage}
              imageStyle={renderProps.buttonImageStyle}
              onClick={() => navigate(renderProps.buttonNavigatePath)}
            />
          )}
        </div>
      </div>
      <div className={renderProps.classNameNav}>
        <div className={renderProps.classNameStatus}>{elementsStatus}</div>
        <div className={renderProps.classNameCategories}>
          <select
            name=""
            className={renderProps.classNameCategoriesSelect}
            onChange={(event) => handleCategoryToggle(event)}
          >
            {elementsCategory}
          </select>
        </div>
      </div>
    </div>
  );
};


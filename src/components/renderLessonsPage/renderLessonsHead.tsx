import "./renderLessonsHead.scss";
import { FC, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Button";
import classNames from "classnames";
import { useNavigate } from "react-router-dom"; 

interface RenderLessonHeadProps {
  statuses: string[];
  categories: string[][];
  isHead: boolean;
  isTitle: boolean;
  isButton: boolean;
  isStatuses: boolean;
  isCategories: boolean;
  isNav: boolean;
  buttonType: any; // eslint-disable-line
  buttonText: string;
  buttonClassName: string;
  buttonImage: any; // eslint-disable-line
  buttonImageStyle: string;
  buttonNavigatePath: string;
  setStatusActive: string;
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
  onCategoryChange: (arg: string) => void;
  category: string;
  setCategoryActive: string;
}

export const RenderLessonHead: FC<RenderLessonHeadProps> = (renderProps) => {
  const intl = useIntl();
  const navigate = useNavigate();
  const onCategoryChange = renderProps.onCategoryChange;
  const [statusActive, setStatusActive] = useState(
    intl.formatMessage({ id: renderProps.setStatusActive})
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const handleStatusToggle = (status: string) => {
    setStatusActive(status);
  };

  const handleCategoryToggle = (event: React.ChangeEvent) => {
    const category = event.target as HTMLInputElement;
    onCategoryChange(category.value);
  };

  const STATUSES = renderProps.statuses.map((status) =>
    intl.formatMessage({ id: status })
  );

  const CATEGORIES_VALUE = renderProps.categories[1].map(
    (category) => category
  );

  const elementsStatus = STATUSES.map((status: string) => {
    return (
      <div key={status} className={renderProps.classNameLessonItem}>
        <span
          onClick={() => handleStatusToggle(status)}
          className={classNames(
            status === statusActive &&
              `${renderProps.classNameLessonItemActive}`
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
  const elementsCategory = CATEGORIES_VALUE.map((category: string) => {
    return (
      <option key={category} id={category} value={category}>
        {category}
      </option>
    );
  });

  return (
    <div className={renderProps.classNameWrapper}>
      {renderProps.isHead && (
        <div className={renderProps.classNameHead}>
          {renderProps.isTitle && (
            <p className={renderProps.classNameTitle}>
              <FormattedMessage id={renderProps.title} />
            </p>
          )}
          {renderProps.isButton && (
            <div className={renderProps.classNameButton}>
              <Button
                buttonType={renderProps.buttonType}
                buttonText={intl.formatMessage({id: `${renderProps.buttonText}`})}
                className={renderProps.buttonClassName}
                buttonImage={renderProps.buttonImage}
                imageStyle={renderProps.buttonImageStyle}
                onClick={() => navigate(renderProps.buttonNavigatePath)}
              />
            </div>
          )}
        </div>
      )}
      {renderProps.isNav && (
        <div className={renderProps.classNameNav}>
          <div className={renderProps.classNameStatus}>
            {renderProps.isStatuses && elementsStatus}
          </div>
          <div className={renderProps.classNameCategories}>
            <select
              value={
                renderProps.setCategoryActive === ""
                  ? renderProps.category
                  : renderProps.setCategoryActive
              }
              name=""
              className={renderProps.classNameCategoriesSelect}
              onChange={(event) => handleCategoryToggle(event)}
            >
              {renderProps.isCategories && elementsCategory}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};


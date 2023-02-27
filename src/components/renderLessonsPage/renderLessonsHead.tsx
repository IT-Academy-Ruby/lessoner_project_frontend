import "./renderLessonsHead.scss";
import { 
  FC, useEffect, useState 
} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import Button from "../Button";
import classNames from "classnames";
import { useNavigate } from "react-router-dom"; 

interface RenderLessonHeadProps {
  statuses: string[];
  categories: string[];
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
  onStatusChange: (arg: string) => void;
  category: string;
  setCategoryActive: string;
  setStatusActive: string;
}

export const RenderLessonHead: FC<RenderLessonHeadProps> = (renderProps) => {
  const [categoryNames, setCategoryNames] = useState<string[]>([]);
  const intl = useIntl();
  const navigate = useNavigate();
  const onCategoryChange = renderProps.onCategoryChange;
  const onStatusChange = renderProps.onStatusChange;

  const handleStatusToggle = (status: string) => {
    onStatusChange(status);
  };

  const handleCategoryToggle = (event: React.ChangeEvent) => {
    const category = event.target as HTMLInputElement;
    onCategoryChange(category.value);
  };

  const STATUSES = renderProps.statuses.map((status) =>
    intl.formatMessage({ id: status })
  );
  
  useEffect(() => {
    setCategoryNames(["All categories", ...renderProps.categories]);
  }, [renderProps.categories]);

  const elementsStatus = STATUSES.map((status: string) => {
    return (
      <div key={status} className={renderProps.classNameLessonItem}>
        <span
          onClick={() => handleStatusToggle(status)}
          className={classNames(
            status === renderProps.setStatusActive &&
              `${renderProps.classNameLessonItemActive}`
          )}
        >
          {status}
          {status === renderProps.setStatusActive && (
            <div className={renderProps.classNameLessonItemUnderline}></div>
          )}
        </span>
      </div>
    );
  });
  const elementsCategory = categoryNames.map((category: string) => {
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


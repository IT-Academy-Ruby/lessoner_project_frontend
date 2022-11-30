import "./PagesTitle.scss";
import { FC, Fragment } from "react";
import { useIntl } from "react-intl";

interface PagesTitleProps {
  pageTitle: string;
}

export const PagesTitle: FC<PagesTitleProps> = ({pageTitle}) => {
  const intl = useIntl();
  const titleType = [
    {
      id: 1, 
      type: "registration",
      class: "title__page",
      value: intl.formatMessage({ id: "app.pagesTitle.registration" }), 
    },
    {
      id: 2, 
      type: "confirm",
      class: "title__page title__confirm",
      value: intl.formatMessage({ id: "app.pagesTitle.confirm" }), 
    },
    {
      id: 3, 
      type: "phoneNumber",
      class: "title__page",
      value: intl.formatMessage({ id: "app.pagesTitle.phoneNumber" }), 
    },
    {
      id: 4, 
      type: "enterCode",
      class: "title__page",
      value: intl.formatMessage({ id: "app.pagesTitle.enterCode" }), 
    },
    {
      id: 5, 
      type: "aboutYourself",
      class: "title__page",
      value: intl.formatMessage({ id: "app.pagesTitle.aboutYourself" }), 
    },
  ];
  return (
    <Fragment>
      {titleType.map((title: {
        id: number; value: string; type: string; class: string; 
          }) => (title.type === pageTitle) && 
            <h1 className={title.class} key={title.id}>
              {title.value}
            </h1>
      )
      } 
    </Fragment>
  );
};

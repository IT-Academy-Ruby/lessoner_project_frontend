import { FC, Fragment } from "react";
import YourselfPage from "../pages/YourselfPage";
import Button from "./Button";
import Checkbox from "./Checkbox";
import FirstRegistrationForm from "./FirstRegistrationForm";
import { PagesTitle } from "./PagesTitle";

interface PagesSelectorProps {
  pageType: string;
  pageTitle: string;
  buttonText: string;
}

export const PagesSelector: FC<PagesSelectorProps> = ({
  pageType, pageTitle, buttonText
}) => {
  switch (pageType) {
  case "registration":
    return (
      <Fragment>
        <PagesTitle pageTitle={pageTitle}/>
        <FirstRegistrationForm/>
      </Fragment>
    );
  case "confirm":
    return (
      <Fragment>
        <PagesTitle pageTitle={pageTitle}/>
        <Button buttonType="button" 
          buttonText={buttonText} 
          className="button__page"/>
      </Fragment>
    );
  case "phoneNumber":
    return (
      <Fragment>
        <PagesTitle pageTitle={pageTitle}/>
        <Checkbox/>
        <Button buttonType="button" 
          buttonText={buttonText} 
          className="button__page"/>
      </Fragment>
    );
  case "enterCode":
    return (
      <Fragment>
        <PagesTitle pageTitle={pageTitle}/>
        <Button buttonType="button" 
          buttonText={buttonText} 
          className="button__page"/>
      </Fragment>
    );
  case "aboutYourself":
    return (
      <Fragment>
        <YourselfPage/>
      </Fragment>
    );
  default:
    return <Fragment></Fragment>;
  };
};

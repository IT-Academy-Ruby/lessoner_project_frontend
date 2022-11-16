import "./Pages.scss";
import Bacground1440 from "./icons/backgroundPages1440.svg";
import Bacground360 from "./icons/backgroundPages360.svg";
import Bacground744 from "./icons/backgroundPages744.svg";
import Close from "./icons/close.svg";
import { FC } from "react";
import {Link} from "react-router-dom";
import Logo1440 from "./icons/logo1440.svg";
import Logo360 from "./icons/logo360.svg";
import Logo744 from "./icons/logo744.svg";
import { PagesSelector } from "./PagesSelector";
import { useIntl } from "react-intl";

interface PagesProps {
  pageType: string;
}

export const Pages: FC<PagesProps> = ({pageType}) => {
  const intl = useIntl();
  const pages = [
    {
      id: 1, 
      type: "registration", 
      pageTitle: pageType,
      buttonText: ""
    },
    {
      id: 2, 
      type: "confirm", 
      pageTitle: pageType,
      buttonText: intl.formatMessage({ id: "app.button.ok" })
    },
    {
      id: 3, 
      type: "phoneNumber", 
      pageTitle: pageType,
      buttonText: intl.formatMessage({ id: "app.button.next" })
    },
    {
      id: 3, 
      type: "enterCode", 
      pageTitle: pageType,
      buttonText: intl.formatMessage({ id: "app.button.next" })
    },
    {
      id: 4, 
      type: "aboutYourself", 
      pageTitle: pageType,
      buttonText: intl.formatMessage({ id: "app.button.finish" })
    },
  ];
  return (
    <div className="reg__wrapper">
      <div className="reg__inner">
        <Link to="/" className="reg__btn-close">
          <img className="reg__svg-close" src={Close} alt="Close"/>
        </Link>
        <div className="reg__picture">
          <div className="reg__image">
            <img className="reg__svg-bacground" src={Bacground1440} alt="Background"/>
            <img className="reg__svg-logo" src={Logo1440} alt="Logo"/>
          </div>
        </div>
        <div className="reg__content">
          {pages.map((page: {
            id: number; pageTitle: string; type: string; buttonText:string;  
          }) => (page.type === pageType) &&
            <div className="reg__content-inner" key={page.id}>
              <PagesSelector 
                pageType={pageType} 
                pageTitle={page.pageTitle} 
                buttonText={page.buttonText}/>
            </div>
          )}
        </div>
      </div>
    </div>  
  );
};

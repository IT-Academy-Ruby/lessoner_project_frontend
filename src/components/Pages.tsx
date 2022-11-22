import "./Pages.scss";
import Bacground1440 from "./icons/backgroundPages1440.svg";
import Bacground360 from "./icons/backgroundPages360.svg";
import Bacground744 from "./icons/backgroundPages744.svg";
import Close from "./icons/close.svg";
import { FC } from "react";
import {Link} from "react-router-dom";
import LoginPage from "../pages/LoginPage";
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
const page =()=>{
  switch(pageType){
    case "Login":
     return <LoginPage/>
  }
}
  const imageClasses = [
    {
      id: 1,
      classIMG: "reg__image1440",
      classBG: "reg__svg-bacground1440",
      classLogo: "reg__svg-logo1440",
      srcBG: Bacground1440,
      srcLogo: Logo1440
    },
    {
      id: 2,
      classIMG: "reg__image744",
      classBG: "reg__svg-bacground744",
      classLogo: "reg__svg-logo744",
      srcBG: Bacground744,
      srcLogo: Logo744
    },
    {
      id: 3,
      classIMG: "reg__image360",
      classBG: "reg__svg-bacground360",
      classLogo: "reg__svg-logo360",
      srcBG: Bacground360,
      srcLogo: Logo360
    },
  ];
  return (
    <div className="reg__wrapper">
      <div className="reg__inner">
        <Link to="/" className="reg__btn-close">
          <img className="reg__svg-close" src={Close} alt="Close"/>
        </Link>
        <div className="reg__picture">
          {imageClasses.map((imageClass: {
            id: number; classIMG: string; classBG: string; classLogo: string; 
            srcBG: string; srcLogo: string;
          }) => 
            <div className={imageClass.classIMG} key={imageClass.id}>
              <img className={imageClass.classBG}
                src={imageClass.srcBG} alt="Background"/>
              <img className={imageClass.classLogo} src={imageClass.srcLogo} alt="Logo"/>
            </div>
          )}
        </div>
        {page()}
      </div>
    </div>  
  );
};

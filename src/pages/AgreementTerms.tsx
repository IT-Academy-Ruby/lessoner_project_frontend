import "./terms.scss";
import {FormattedMessage} from "react-intl";
import {useNavigate} from "react-router-dom";

const AgreementTerms=()=>{
  const navigate = useNavigate();
  return(
    <div className="wrapper-terms">
      <div
        onClick={()=>navigate("/")}
        className="button-back">
        <span className="arrow-back">&#10094;</span>
        <span><FormattedMessage id="app.categories.back"/></span>
      </div>

    </div>
  )
}
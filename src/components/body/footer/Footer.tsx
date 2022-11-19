import {Link} from "react-router-dom";
import LANGUAGES from '../../translations/constants';
import {FormattedMessage} from 'react-intl';
import {useAppSelector, useAppDispatch} from "../../../store/hooks";
import {nameDecodeUser} from "../../../store/header/decodeJwtSlice";
import {useEffect} from "react";
import {lessonerLink, startLink} from "../../../store/links/linksSlise";

type FooterProps = {
  onLanguageSwitch: (arg: string) => void
}
const Footer = (props: FooterProps) => {
  const {onLanguageSwitch} = props
  const decodeUserName = useAppSelector(state => state.userDecodeName.name);
  const lessoner = useAppSelector(state => state.link.link);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(nameDecodeUser());
    if (decodeUserName) {
      dispatch(lessonerLink());
    } else {
      startLink();
    }
  }, [decodeUserName]);

  return (
    <div style={{display: "flex"}}>
      <Link to={lessoner}>
        <div>
          <FormattedMessage id="app.name"/>
        </div>
      </Link>
      <Link to="/categories">
        <div>
          <FormattedMessage id="app.categories"/>
        </div>
      </Link>
      <Link to="/lessons">
        <div>
          <FormattedMessage id="app.lessons"/>
        </div>
      </Link>
      <Link to="/about">
        <div>
          <FormattedMessage id="app.about"/>
        </div>
      </Link>
      <div>
        {LANGUAGES.map(languageObj => {
          const {code, label} = languageObj

          return (
            <button onClick={() => onLanguageSwitch(code)}>{label}</button>
          )
        })}
      </div>
      <Link to="/users/sign_in">
        <button>
          <FormattedMessage id="app.login"/>
        </button>
      </Link>
      <Link to="/users/sign_up">
        <button>
          <FormattedMessage id="app.registration"/>
        </button>
      </Link>
    </div>
  );
};
export default Footer;

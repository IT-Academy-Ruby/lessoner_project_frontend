import {Link} from "react-router-dom";
import "./Header.css";
import LANGUAGES from '../../translations/constants';
import {FormattedMessage } from 'react-intl';

type FooterProps = {
  onLanguageSwitch: (arg: string) => void
}
const Footer = (props: FooterProps) => {
  const { onLanguageSwitch } = props

  return (
    <div className="nav-bar">
      <Link to="/">
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
          <FormattedMessage id="app.lessons" />
        </div>
      </Link>
      <Link to="/about">
        <div>
          <FormattedMessage id="app.about" />
        </div>
      </Link>
      <div>
        {LANGUAGES.map(languageObj => {
          const { code, label } = languageObj

          return (
            <button onClick={() => onLanguageSwitch(code)}>{label}</button>
          )
        })}
      </div>
      <Link to="/users/sign_in">
        <button>
          <FormattedMessage id="app.login" />
        </button>
      </Link>
      <Link to="/users/sign_up">
        <button>
          <FormattedMessage id="app.registration" />
        </button>
      </Link>
    </div>
  );
};
export default Footer;

import "./language.module.scss";
import {useEffect, useState} from "react";
import Arrow from "../../icons/arrowDown.svg";
import ArrowRight from "../../icons/arrowRight.svg";
import Check from "../../icons/check.svg";
import {FormattedMessage} from "react-intl";
import Globe from "../../icons/Globe.svg";
import {LANGUAGES} from "../../../translations/constants";
import classNames from "classnames";

type LanguageProps = {
  onLanguageSwitch: (arg: string) => void;
  isRegistered: boolean;
  language: string;
  setLanguage: (arg: string) => void;
}

export const Language = ({
  onLanguageSwitch, isRegistered, language, setLanguage
}: LanguageProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    onLanguageSwitch(language);
  }, [language,onLanguageSwitch]);

  const changelanguage = (value: string) => {
    setLanguage(value);
    setIsChecked(false);
  };

  return (
    <div className="language">
      <label
        htmlFor="input-language"
        className={classNames("lang", {"lang-registration": isRegistered})}>
        <img src={Globe} alt="language" className="globe"/>
        {isRegistered ? <FormattedMessage id="app.header.language"/> : language}
        <div className="wrapper-arrow">
          <img src={!isChecked ? ArrowRight : Arrow} alt="arrow" className="arrow-language"/>
        </div>
      </label>
      
      <input
        type="checkbox"
        className="input-lang"
        id="input-language"
        checked={isChecked}
        onChange={() => {
          setIsChecked(!isChecked);
        }}/>
      <ul className={classNames("list",
        {"list-language": isRegistered},
        {"no-registration-list": !isRegistered})}>
        {LANGUAGES.map((lang:{label: string, code: string}) => {
          return <li
            key={lang.code}
            className="lang-name"
            onClick={() => changelanguage(lang.code)}>
            {lang.label}
            {language === lang.code &&
              <img
                src={Check}
                alt="check"
                className="check-language"/>
            }
          </li>;
        }
        )}
      </ul>
    </div>
  );
};
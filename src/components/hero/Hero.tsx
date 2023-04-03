import "./hero.module.scss";
import { THEME, useTheme } from "../../utils/useTheme";
import {Button} from "../Button";
import heroDark from "../../assets/hero-dark.png";
import heroLight from "../../assets/hero-light.png";
import {useAppSelector} from "../../store/hooks";
import {useIntl} from "react-intl";
import {useNavigate} from "react-router-dom";

export const Hero = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const image = theme === THEME.DARK ? heroDark : heroLight;
  const intl = useIntl();
  const user = useAppSelector(state => state.login.user.name);
  const title = intl.formatMessage({id: "app.hero.title"});
  const subtitle = intl.formatMessage({id: "app.hero.subtitle"});
  const buttonTextHero = intl.formatMessage({id: "app.hero.buttonText"});

  return (
    <section className="hero">
      <div className="hero__body">
        <p className="hero__title" dangerouslySetInnerHTML={{__html: title}}/>
        <p className="hero__subtitle" dangerouslySetInnerHTML={{__html: subtitle}} />
        {!user && <Button
          buttonType="button"
          buttonText = {buttonTextHero}
          onClick={() => navigate("/user/sign_up")}
          className="hero__button"
        />}
      </div>
      <div className="hero__image">
        <img src={image} />
      </div>
    </section>
  );
};

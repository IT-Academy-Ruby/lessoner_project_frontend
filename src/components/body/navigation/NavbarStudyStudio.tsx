import "./NavbarStudyStudio.scss";
import {
  FC,
  useContext,
  useState
} from "react";
import NavbarStudyStudioSVGSelector from "./NavbarStudyStudioSVGSelector";
import classNames from "classnames";
import { snowContext } from "../../../App";
import useDarkMode from "use-dark-mode";
import {useIntl} from "react-intl";


interface NavbarStudyStudioProps {
  menuType: string;
  onSignOut: VoidFunction;
}

type itemType = {
  id: number;
  href: string;
  valueId: string;
  icon: string;
  place: {
    openclose?: string;
    notAutorised?: string;
    autorised?: string;
    admin?: string;
    logIn?: string;
    logOut?: string;
    darkTheme?: string;
    lightTheme?: string;
    snowOn?: string;
    snowOff?: string;
    contacts?: string;
  };
};

const items = [
  {
    id: 1,
    valueId: "Menu",
    href: "#",
    icon: "menu",
    place: { openclose: "openclose" },
  },
  {
    id: 2,
    valueId: "app.navbarStudyStudio.home",
    href: "/",
    icon: "home",
    place: {
      notAutorised: "not_autorised",
      autorised: "autorised",
      admin: "admin",
    },
  },
  {
    id: 3,
    valueId: "app.navbarStudyStudio.subscription",
    href: "/myStudio",
    icon: "subscription",
    place: { autorised: "autorised", admin: "admin" },
  },
  {
    id: 4,
    valueId: "app.navbarStudyStudio.categories",
    href: "/categories",
    icon: "categories",
    place: {
      notAutorised: "not_autorised",
      autorised: "autorised",
      admin: "admin",
    },
  },
  // To be added later...
  // {
  //   id: 5,
  //   valueId: "app.navbarStudyStudio.management",
  //   href: "#",
  //   icon: "edit_categories",
  //   place: { admin: "admin" },
  // },
  {
    id: 6,
    valueId: "app.navbarStudyStudio.aboutUs",
    href: "/about",
    icon: "about_us",
    place: {
      notAutorised: "not_autorised",
      autorised: "autorised",
      admin: "admin",
    },
  },
  {
    id: 7,
    valueId: "app.navbarStudyStudio.logIn",
    href: "#",
    icon: "log_in",
    place: { logIn: "log_in" },
  },
  {
    id: 8,
    valueId: "app.navbarStudyStudio.logOut",
    href: "#",
    icon: "log_out",
    place: { logOut: "log_out" },
  },
  {
    id: 9,
    valueId: "app.navbarStudyStudio.darkTheme",
    href: "#",
    icon: "dark_theme",
    place: { darkTheme: "dark_theme" },
  },
  {
    id: 10,
    valueId: "app.navbarStudyStudio.lightTheme",
    href: "#",
    icon: "light_theme",
    place: { lightTheme: "light_theme" },
  },
  {
    id: 11,
    valueId: "app.navbarStudyStudio.snowOn",
    href: "#",
    icon: "snow_on",
    place: { snowOn: "snow_on" },
  },
  {
    id: 12,
    valueId: "app.navbarStudyStudio.snowOff",
    href: "#",
    icon: "snow_off",
    place: { snowOff: "snow_off" },
  },
  {
    id: 13,
    valueId: "app.navbarStudyStudio.management",
    href: "https://www.grodno.it-academy.by/",
    icon: "network",
    place: { contacts: "contacts" },
  },
  {
    id: 14,
    valueId: "app.navbarStudyStudio.management",
    href: "https://www.instagram.com/grodnoitacademypark/",
    icon: "instagram",
    place: { contacts: "contacts" },
  },
  {
    id: 15,
    valueId: "app.navbarStudyStudio.management",
    href: "https://www.facebook.com/grodnoitacademypark",
    icon: "facebook",
    place: { contacts: "contacts" },
  },
  {
    id: 16,
    valueId: "app.navbarStudyStudio.management",
    href: "https://www.linkedin.com/school/15248534/",
    icon: "linkedin",
    place: { contacts: "contacts" },
  },
];

const NavbarStudyStudio: FC<NavbarStudyStudioProps> = ({menuType, onSignOut}) => {
  const intl = useIntl();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [pressedButtonId, setPressedButtonId] = useState<number>();
  const darkMode = useDarkMode(true);

  const snow = useContext(snowContext);
  const snowToggle = snow
    ? () => snow.setSnow((value) => !value)
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    : () => {};

  const imageWrapperCN = classNames("image__wrapper", 
    {"image__wrapper--active": !isMenuActive});
  const imageWrapperThemeCN = classNames("image__wrapper-theme", 
    {"image__wrapper-theme--active": !isMenuActive});
  const imageWrapperFooterCN = classNames("image__wrapper-footer", 
    {"image__wrapper-footer--active": !isMenuActive});
  const menuFooterLginoutCN = classNames("menu__footer-lginout", 
    {"menu__footer-lginout--active": isMenuActive});
  const menuFooterContactsCN = classNames("menu__footer-contacts", 
    {"menu__footer-contacts--active": isMenuActive});
  const footerContactsNumberCN = classNames("footer__contacts-number", 
    {"footer__contacts-number--active": isMenuActive});
  const footerContactsTitleCN = classNames("footer__contacts-title", 
    {"footer__contacts-title--active": isMenuActive});
  const svgItemCN = classNames("svg__item", {"svg__item--active" : isMenuActive});
  const svgMenuCN = classNames("svg__menu", {"svg__menu--active" : isMenuActive});
  const menuTextCN = classNames("menu__text", {"menu__text--active": isMenuActive});
  const menuContentCN = classNames("menu__content", {"menu__content--active": isMenuActive});
  const menuItemInnerCN = classNames("menu__item-inner", 
    {"menu__item-inner--active": isMenuActive});

  const renderTheme_LogInOut = (item: itemType) => {
    const isActiveItem = item.id === pressedButtonId;

    return (
      <li
        className={"menu__item menu__item-footer"}
        key={item.id}
        onClick={() => isActiveItem && setPressedButtonId(item.id)}
      >
        <a className={classNames({"menu__item-inner-theme": item.place.lightTheme || 
          item.place.darkTheme}, menuItemInnerCN,
        {"menu__item-inner--selected": item.id === pressedButtonId})} href={item.href}
        >
          <span
            className={classNames((item.place.lightTheme || item.place.darkTheme) ? 
              imageWrapperThemeCN : imageWrapperCN, {"image__wrapper--selected": 
              isActiveItem})}
          >
            <div className={classNames(svgItemCN, {"svg__item--selected": isActiveItem})}>
              <NavbarStudyStudioSVGSelector icon={item.icon} />
            </div>
          </span>
          <span className={`${menuTextCN} ${isActiveItem ? "menu__text--selected" : ""}`}>
            {intl.formatMessage({id: item.valueId})}
          </span>
        </a>
      </li>
    );
  };

  return (
    <div onClick={() => setIsMenuActive(false)}>
      <div className={menuContentCN} onClick={(e) => e.stopPropagation()}>
        <ul className="menu__inner">
          <div
            className="menu__item"
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <div className="image__wrapper image__wrapper--active">
              <div className={classNames(svgMenuCN)}>
                <NavbarStudyStudioSVGSelector icon="menu" />
              </div>
            </div>
          </div>
          <div className="navbar__main" >
            {items.map((item: itemType) =>
              (item.place.admin === menuType || 
                item.place.autorised === menuType || 
                item.place.notAutorised === menuType)  && (
                <li
                  className={"menu__item"}
                  key={item.id}
                  onClick={() => item.id !== pressedButtonId && setPressedButtonId(item.id)}
                >
                  <a className={classNames(menuItemInnerCN, 
                    {"menu__item-inner--selected": item.id === pressedButtonId})} href={item.href}>
                    <span
                      className={classNames(imageWrapperCN, 
                        {"image__wrapper--selected": item.id === pressedButtonId})}
                    >
                      <div
                        className={classNames(svgItemCN, 
                          {"svg__item--selected": item.id === pressedButtonId})}
                      >
                        <NavbarStudyStudioSVGSelector icon={item.icon} />
                      </div>
                    </span>
                    <span
                      className={`${menuTextCN} ${
                        item.id === pressedButtonId ? "menu__text--selected" : ""
                      }`}
                    >
                      {intl.formatMessage({id: item.valueId})}
                    </span>
                  </a>
                </li>
              )
            )}
          </div>
          <div className="menu__footer">
            <div className={classNames(menuFooterContactsCN)}>
              <div className="footer__contacts-content">
                <p className={classNames(footerContactsTitleCN)}>
                  {intl.formatMessage({id: "app.navbarStudyStudio.contacts"})}
                </p>
                <a className={classNames(footerContactsNumberCN)} href="tel:+375 152 55 44 44">
                  +375 152 55 44 44 
                </a>
              </div>
              <div className="footer__contacts-social">
                {items.map((item: itemType) =>
                  item.place.contacts && (
                    <li
                      className={"footer__social-item"}
                      key={item.id}
                    >
                      <a className={classNames(imageWrapperFooterCN)} 
                        href={item.href} target="_blank" rel="noreferrer">
                        <div className={classNames(svgItemCN)}>
                          <NavbarStudyStudioSVGSelector icon={item.icon} />
                        </div>
                      </a>
                    </li>
                  )
                )}
              </div>
            </div>
            <div className={classNames(menuFooterLginoutCN)} onClick={onSignOut}>
              {items.map((item: itemType) =>
                (menuType === "not_autorised") 
                  ? 
                  item.place.logIn && renderTheme_LogInOut(item)
                  :
                  item.place.logOut && renderTheme_LogInOut(item)
              )}
            </div>
            <div className="menu__footer-theme" onClick={darkMode.toggle}>
              {items.map((item: itemType) =>
                darkMode.value 
                  ? 
                  item.place.lightTheme && renderTheme_LogInOut(item)
                  :
                  item.place.darkTheme && renderTheme_LogInOut(item)
              )}
            </div>
            <div className="menu__footer-snow" onClick={snowToggle}>
              {items.map((item: itemType) =>
                snow?.snow
                  ? item.place.snowOff && renderTheme_LogInOut(item)
                  : item.place.snowOn && renderTheme_LogInOut(item)
              )}
            </div>
            <div className="menu__footer-rights">
              <p className="menu__footer-date">
                &reg; 2023<span className={classNames("menu__footer-text", 
                  {"menu__footer-text--active": isMenuActive})}>.</span>{" "} 
                <span className={classNames("menu__footer-text", 
                  {"menu__footer-text--active": isMenuActive})}
                >{intl.formatMessage({ id: "app.navbarStudyStudio.footer" })}</span>
              </p>
              <p className={classNames("menu__footer-text", 
                {"menu__footer-text--active": isMenuActive})} >
                <a className={classNames("menu__footer-text menu__footer-policy", 
                  {"menu__footer-text--active": isMenuActive})} href="#!">
                  {intl.formatMessage({ id: "app.navbarStudyStudio.policy" })}
                </a>
              </p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavbarStudyStudio;

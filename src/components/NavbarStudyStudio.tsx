import "./NavbarStudyStudio.scss";
import {FC, useState} from "react";
import NavbarStudyStudioSVGSelector from "./NavbarStudyStudioSVGSelector";
import classNames from "classnames";
import {useIntl} from "react-intl";

interface NavbarStudyStudioProps {
  menuType: string;
}

const NavbarStudyStudio: FC<NavbarStudyStudioProps> = ({menuType}) => {
  const intl = useIntl();
  const EMPTY_BUTTON_ID = 0;
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [buttonPressed, setButtonPressed] = useState(EMPTY_BUTTON_ID);
  
  const items = [
    {
      id: 1,
      value: "Menu",
      href: "#!",
      icon: "menu",
      place: {
        openclose: "openclose",
      },
    },
    {
      id: 2,
      value: `${intl.formatMessage({ id: "app.navbarStudyStudio.home" })}`,
      href: "#!",
      icon: "home",
      place: {
        notAutorised: "not_autorised",
        autorised: "autorised",
        admin: "admin",
      },
    },
    {
      id: 3,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.subscription"
      })}`,
      href: "#!",
      icon: "subscription",
      place: {
        autorised: "autorised",
        admin: "admin",
      },
    },
    {
      id: 4,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.categories"
      })}`,
      href: "#!",
      icon: "categories",
      place: {
        notAutorised: "not_autorised",
        autorised: "autorised",
        admin: "admin",
      },
    },
    {
      id: 5,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.management"
      })}`,
      href: "#!",
      icon: "edit_categories",
      place: {
        admin: "admin",
      },
    },
    {
      id: 6,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.aboutUs"
      })}`,
      href: "#!",
      icon: "about_us",
      place: {
        notAutorised: "not_autorised",
        autorised: "autorised",
        admin: "admin",
      },
    },
    {
      id: 7,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.logIn"
      })}`,
      href: "#!",
      icon: "log_in",
      place: {
        logIn: "log_in",
      },
    },
    {
      id: 8,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.logOut"
      })}`,
      href: "#!",
      icon: "log_out",
      place: {
        logOut: "log_out",
      },
    },
    {
      id: 9,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.darcTheme"
      })}`,
      href: "#!",
      icon: "darc_theme",
      place: {
        theme: "theme",
      },
    },
    {
      id: 10,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.lightTheme"
      })}`,
      href: "#!",
      icon: "light_theme",
      place: {
        theme: "theme",
      },
    },
    {
      id: 11,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.management"
      })}`,
      href: "https://www.grodno.it-academy.by/",
      icon: "network",
      place: {
        contacts: "contacts"
      },
    },
    {
      id: 12,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.management"
      })}`,
      href: "https://www.instagram.com/grodnoitacademypark/",
      icon: "instagram",
      place: {
        contacts: "contacts"
      },
    },
    {
      id: 13,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.management"
      })}`,
      href: "https://www.facebook.com/grodnoitacademypark",
      icon: "facebook",
      place: {
        contacts: "contacts"
      },
    },
    {
      id: 14,
      value: `${intl.formatMessage({
        id: "app.navbarStudyStudio.management"
      })}`,
      href: "https://www.linkedin.com/school/15248534/",
      icon: "linkedin",
      place: {
        contacts: "contacts"
      },
    },
  ];

  const imageWrapperCN = classNames("image__wrapper", {"image__wrapper--active": !isMenuActive});
  const imageWrapperThemeCN = classNames("image__wrapper-theme", {"image__wrapper-theme--active": !isMenuActive});
  const imageWrapperFooterCN = classNames("image__wrapper-footer", {"image__wrapper-footer--active": !isMenuActive});
  const menuFooterLginoutCN = classNames("menu__footer-lginout", {"menu__footer-lginout--active": isMenuActive});
  const menuFooterContactsCN = classNames("menu__footer-contacts", {"menu__footer-contacts--active": isMenuActive});
  const footerContactsNumberCN = classNames("footer__contacts-number", {"footer__contacts-number--active": isMenuActive});
  const footerContactsTitleCN = classNames("footer__contacts-title", {"footer__contacts-title--active": isMenuActive});
  const svgItemCN = classNames("svg__item", {"svg__item--active" : isMenuActive});
  const menuTextCN = classNames("menu__text", {"menu__text--active": isMenuActive});
  const menuContentCN = classNames("menu__content", {"menu__content--active": isMenuActive});
  const menuItemInnerCN = classNames("menu__item-inner", {"menu__item-inner--active": isMenuActive});

  return (
    <div onClick={() => setIsMenuActive(false)}>
      <div className={menuContentCN} onClick={(e) => e.stopPropagation()}>
        <ul className="menu__inner">
          <div
            className="menu__item"
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <div className="image__wrapper image__wrapper--active">
              <div className="svg svg__menu">
                <NavbarStudyStudioSVGSelector icon="menu" />
              </div>
            </div>
          </div>
          {items.map(
            (item: {
              id: number;
              href: string;
              value: string;
              icon: string;
              place: any;
            }) =>
              item.place.autorised === menuType && (
                <li
                  className={"menu__item"}
                  key={item.id}
                  onClick={() =>
                    item.id !== buttonPressed && setButtonPressed(item.id)
                  }
                >
                  <a className={classNames(menuItemInnerCN, {
                        "menu__item-inner--selected": item.id === buttonPressed,
                      })} href={item.href}>
                    <span
                      className={classNames(imageWrapperCN, {
                        "image__wrapper--selected": item.id === buttonPressed,
                      })}
                    >
                      <div
                        className={classNames(svgItemCN, {
                          "svg__item--selected": item.id === buttonPressed,
                        })}
                      >
                        <NavbarStudyStudioSVGSelector icon={item.icon} />
                      </div>
                    </span>
                    <span
                      className={`${menuTextCN} ${
                        item.id === buttonPressed ? "menu__text--selected" : ""
                      }`}
                    >
                      {item.value}
                    </span>
                  </a>
                </li>
              )
          )}
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
                {items.map((item: {
                  id: number;
                  href: string;
                  value: string;
                  icon: string;
                  place: any;
                  }) =>
                  item.place.contacts && (
                    <li
                      className={"footer__social-item"}
                      key={item.id}
                    >
                      <a className={classNames(imageWrapperFooterCN)} href={item.href} target="_blank" rel="noreferrer">
                          <div
                            className={classNames(svgItemCN)}
                          >
                            <NavbarStudyStudioSVGSelector icon={item.icon} />
                          </div>
                      </a>
                    </li>
                    )
                )}
              </div>
            </div>
            <div className={classNames(menuFooterLginoutCN)}>
              {items.map(
                (item: {
                  id: number;
                  href: string;
                  value: string;
                  icon: string;
                  place: any;
                }) =>
                  item.place.logIn && (
                    <li
                      className={"menu__item menu__item-footer"}
                      key={item.id}
                      onClick={() =>
                        item.id !== buttonPressed && setButtonPressed(item.id)
                      }
                    >
                      <a className={classNames(menuItemInnerCN, {
                            "menu__item-inner--selected": item.id === buttonPressed,
                          })} href={item.href}>
                        <span
                          className={classNames(imageWrapperCN, {
                            "image__wrapper--selected": item.id === buttonPressed,
                          })}
                        >
                          <div
                            className={classNames(svgItemCN, {
                              "svg__item--selected": item.id === buttonPressed,
                            })}
                          >
                            <NavbarStudyStudioSVGSelector icon={item.icon} />
                          </div>
                        </span>
                        <span
                          className={`${menuTextCN} ${
                            item.id === buttonPressed ? "menu__text--selected" : ""
                          }`}
                        >
                          {item.value}
                        </span>
                      </a>
                    </li>
                  )
              )}
            </div>
            <div className="menu__footer-theme">
              {items.map(
                (item: {
                  id: number;
                  href: string;
                  value: string;
                  icon: string;
                  place: any;
                }) =>
                  item.place.theme && (
                    <li
                      className={"menu__item menu__item-footer"}
                      key={item.id}
                      onClick={() =>
                        item.id !== buttonPressed && setButtonPressed(item.id)
                      }
                    >
                      <a className={classNames(menuItemInnerCN, {
                            "menu__item-inner--selected": item.id === buttonPressed,
                          })} href={item.href}>
                        <span
                          className={classNames(imageWrapperThemeCN, {
                            "image__wrapper-theme--selected": item.id === buttonPressed,
                          })}
                        >
                          <div
                            className={classNames(svgItemCN, {
                              "svg__item--selected": item.id === buttonPressed,
                            })}
                          >
                            <NavbarStudyStudioSVGSelector icon={item.icon} />
                          </div>
                        </span>
                        <span
                          className={`${menuTextCN} ${
                            item.id === buttonPressed ? "menu__text--selected" : ""
                          }`}
                        >
                          {item.value}
                        </span>
                      </a>
                    </li>
                  )
              )}
            </div>
            <div className="menu__footer-rights">
            <p className="menu__footer-date">
              &reg; 2023<span className={classNames("menu__footer-text", {
                "menu__footer-text--active": isMenuActive,
              })}>.</span>{" "} <span className={classNames("menu__footer-text", {
                "menu__footer-text--active": isMenuActive,
              })}
            >{intl.formatMessage({ id: "app.navbarStudyStudio.footer" })}</span>
            </p>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default NavbarStudyStudio;
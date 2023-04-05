import "./navbarStudyStudio.scss";
import {Item, NavbarStudyStudioProps} from "./types.d";
import {FC} from "react";
import {Link} from "react-router-dom";
import {NavbarStudyStudioSVGSelector} from "./NavbarStudyStudioSVGSelector";
import classNames from "classnames";
import {useIntl} from "react-intl";

export const NavbarStudyStudio: FC<NavbarStudyStudioProps> = ({config, isMenuActive}) => {
  const intl = useIntl();

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
  const svgItemCN = classNames("svg__item", {"svg__item--active": isMenuActive});

  const menuTextCN = classNames("menu__text", {"menu__text--active": isMenuActive});
  const menuContentCN = classNames("menu__content", {"menu__content--active": isMenuActive});
  const menuItemInnerCN = classNames("menu__item-inner",
    {"menu__item-inner--active": isMenuActive});

  const renderTheme_LogInOut = (item: Item) => {
    const isActiveItem = item.isHighlighted;
    const isTheme = item.id === 9 || item.id === 10;

    return (
      <li
        className={"menu__item menu__item-footer"}
        key={item.id}
      >
        <Link className={classNames({"menu__item-inner-theme": isTheme}, menuItemInnerCN,
          {"menu__item-inner--selected": isActiveItem})} to={item.href}
        >
          <span
            className={classNames(isTheme ?
              imageWrapperThemeCN : imageWrapperCN, {"image__wrapper--selected": isActiveItem}
            )}
          >
            <div className={classNames(svgItemCN, {"svg__item--selected": isActiveItem})}>
              <NavbarStudyStudioSVGSelector icon={item.icon}/>
            </div>
          </span>
          <span className={`${menuTextCN} ${isActiveItem ? "menu__text--selected" : ""}`}>
            {intl.formatMessage({id: item.valueId})}
          </span>
        </Link>
      </li>
    );
  };

  return (
    <div className={menuContentCN} onClick={(e) => e.stopPropagation()}>
      <ul className="menu__inner">

        <div className={classNames("wrapper-menu", {"wrapper-menu-active": isMenuActive})}>
          <div className="navbar__main">
            {config.body.map(item => {
              const isActiveItem = item.isHighlighted;
              return (
                <li
                  className={"menu__item"}
                  key={item.id}
                >
                  <Link className={classNames(menuItemInnerCN,
                    {"menu__item-inner--selected": isActiveItem})} to={item.href}>
                    <span
                      className={classNames(imageWrapperCN,
                        {"image__wrapper--selected": isActiveItem})}
                    >
                      <div
                        className={classNames(svgItemCN,
                          {"svg__item--selected": isActiveItem})}
                      >
                        <NavbarStudyStudioSVGSelector icon={item.icon}/>
                      </div>
                    </span>
                    <span
                      className={`${menuTextCN} ${
                        isActiveItem ? "menu__text--selected" : ""
                      }`}
                    >
                      {intl.formatMessage({id: item.valueId})}
                    </span>
                  </Link>
                </li>
              );
            })}
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
                {config.social.map((item) => {
                  return (
                    <li
                      className={"footer__social-item"}
                      key={item.id}
                    >
                      <a className={classNames(imageWrapperFooterCN)}
                        href={item.href} target="_blank" rel="noreferrer">
                        <div className={classNames(svgItemCN)}>
                          <NavbarStudyStudioSVGSelector icon={item.icon}/>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </div>
            </div>
            {config.footer.map(item => {
              return (
                <div
                  className={classNames(menuFooterLginoutCN)}
                  key={item.id}
                  onClick={item.onClick}
                >
                  {renderTheme_LogInOut(item)}
                </div>
              );
            })}
            <div className="menu__footer-rights">
              <p className="menu__footer-date">
                &reg; 2023<span className={classNames("menu__footer-text",
                  {"menu__footer-text--active": isMenuActive})}>.</span>{" "}
                <span className={classNames("menu__footer-text",
                  {"menu__footer-text--active": isMenuActive})}
                >{intl.formatMessage({id: "app.navbarStudyStudio.footer"})}</span>
              </p>
              <p className={classNames("menu__footer-text",
                {"menu__footer-text--active": isMenuActive})}>
                <Link className={classNames("menu__footer-text menu__footer-policy",
                  {"menu__footer-text--active": isMenuActive})} to="/terms">
                  {intl.formatMessage({id: "app.navbarStudyStudio.policy"})}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};
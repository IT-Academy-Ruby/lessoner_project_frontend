import {
  Config, Item, Status 
} from "./types.d";
import { filterItems, highlightActiveItem } from "./sidebarHelper";

type Callbacks = {
  snowToggle: VoidFunction;
  handleSignOut: VoidFunction;
  toggleTheme: VoidFunction;
}

export const buildMainSidebarConfig = (
  status: Status, callbacks: Callbacks, path: string): Config => {
  const bodyItems = [
    {
      id: 2,
      valueId:"app.navbarStudyStudio.home",
      href: "/",
      icon: "home",
    },
    {
      id: 3,
      valueId: "app.navbarStudyStudio.subscription",
      href: "/myStudio",
      icon: "subscription",
      includeIn: "authorized"
    },
    {
      id: 4,
      valueId: "app.navbarStudyStudio.categories",
      href: "/categories",
      icon: "categories",
    },
    {
      id: 5,
      valueId: "app.navbarStudyStudio.management",
      href: "/categories",
      icon: "edit_categories",
      includeIn: "admin"
    },
    {
      id: 6,
      valueId: "app.navbarStudyStudio.aboutUs",
      href: "/about",
      icon: "about_us",
    },
  ] as Item[];

  const footerItems = [
    {
      id: 7,
      valueId: "app.navbarStudyStudio.logIn",
      href: "/user/sign_in",
      icon: "log_in",
      excludeFrom: "authorized",
    },
    {
      id: 8,
      valueId: "app.navbarStudyStudio.logOut",
      href: "#",
      icon: "log_out",
      includeIn: "authorized",
      onClick: callbacks.handleSignOut,
    },
    {
      id: 9,
      valueId: "app.navbarStudyStudio.darkTheme",
      href: "#",
      icon: "dark_theme",
      place: { darkTheme: "dark_theme" },
      includeIn: "lightTheme",
      onClick: callbacks.toggleTheme,
    },
    {
      id: 10,
      valueId: "app.navbarStudyStudio.lightTheme",
      href: "#",
      icon: "light_theme",
      excludeFrom: "lightTheme",
      onClick: callbacks.toggleTheme,
    },
    {
      id: 11,
      valueId: "app.navbarStudyStudio.snowOn",
      href: "#",
      icon: "snow_on",
      excludeFrom: "snowing",
      onClick: callbacks.snowToggle,
    },
    {
      id: 12,
      valueId: "app.navbarStudyStudio.snowOff",
      href: "#",
      icon: "snow_off",
      includeIn: "snowing",
      onClick: callbacks.snowToggle,
    },
  ] as Item[];

  const socilaItems = [
    {
      id: 13,
      valueId: "app.navbarStudyStudio.management",
      href: "https://www.grodno.it-academy.by/",
      icon: "network",
    },
    {
      id: 14,
      valueId: "app.navbarStudyStudio.management",
      href: "https://www.instagram.com/grodnoitacademypark/",
      icon: "instagram",
    },
    {
      id: 15,
      valueId: "app.navbarStudyStudio.management",
      href: "https://www.facebook.com/grodnoitacademypark",
      icon: "facebook",
    },
    {
      id: 16,
      valueId: "app.navbarStudyStudio.management",
      href: "https://www.linkedin.com/school/15248534/",
      icon: "linkedin",
    },
  ] as Item[];

  const mainSidebarConfig = {
    body: highlightActiveItem(filterItems(bodyItems, status), path),
    footer: highlightActiveItem(filterItems(footerItems, status), path),
    social: socilaItems, status,
  };

  return mainSidebarConfig;
};

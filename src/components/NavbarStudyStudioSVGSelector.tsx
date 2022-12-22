import {ReactComponent as AboutUs} from "./icons/navbar/about_us.svg";
import {ReactComponent as Categories} from "./icons/navbar/categories.svg";
import {ReactComponent as Close} from "./icons/navbar/close.svg";
import { ReactComponent as DarkTheme } from "./icons/navbar/dark_theme.svg";
import { ReactComponent as EditCategories } from "./icons/navbar/edit_categories.svg";
import { ReactComponent as Facebook } from "./icons/navbar/facebook.svg";
import {ReactComponent as HatMylesson} from "./icons/navbar/hat_mylesson.svg";
import {ReactComponent as Home} from "./icons/navbar/home.svg";
import { ReactComponent as Instagram } from "./icons/navbar/instagram.svg";
import { ReactComponent as LightTheme } from "./icons/navbar/light_theme.svg";
import { ReactComponent as Linkedin } from "./icons/navbar/linkedin.svg";
import { ReactComponent as LogIn } from "./icons/navbar/log_in.svg";
import { ReactComponent as LogOut } from "./icons/navbar/log_out.svg";
import {ReactComponent as Management} from "./icons/navbar/management.svg";
import {ReactComponent as Menu} from "./icons/navbar/menu.svg";
import {ReactComponent as MyLesson} from "./icons/navbar/my_lesson.svg";
import { ReactComponent as Network } from "./icons/navbar/network.svg";
import { ReactComponent as Subscription } from "./icons/navbar/subscription.svg";
import {ReactComponent as WatchLater} from "./icons/navbar/watch_later.svg";

type Props = {
  icon: string;
}

const NavbarStudyStudioSVGSelector = ({ icon }: Props) => {
  switch (icon) {
  case "menu":
    return <Menu />;
  case "close":
    return <Close />;
  case "home":
    return <Home />;
  case "categories":
    return <Categories />;
  case "subscription":
    return <Subscription />;
  case "hat_mylesson":
    return <HatMylesson />;
  case "watch_later":
    return <WatchLater />;
  case "my_lesson":
    return <MyLesson />;
  case "management":
    return <Management />;
  case "about_us":
    return <AboutUs />;
  case "edit_categories":
    return <EditCategories />;
  case "log_in":
    return <LogIn />;
  case "log_out":
    return <LogOut />;
  case "dark_theme":
    return <DarkTheme />;
  case "light_theme":
    return <LightTheme />;
  case "network":
    return <Network />;
  case "instagram":
    return <Instagram />;
  case "facebook":
    return <Facebook />;
  case "linkedin":
    return <Linkedin />;
  default:
    return <svg></svg>;
  };
};

export default NavbarStudyStudioSVGSelector;
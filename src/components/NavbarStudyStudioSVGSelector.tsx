import {ReactComponent as Categories} from "./icons/categories.svg";
import {ReactComponent as Close} from "./icons/close.svg";
import {ReactComponent as HatMylesson} from "./icons/hat_mylesson.svg";
import {ReactComponent as Home} from "./icons/home.svg";
import {ReactComponent as Management} from "./icons/management.svg";
import {ReactComponent as Menu} from "./icons/menu.svg";
import {ReactComponent as MyLesson} from "./icons/my_lesson.svg";
import {ReactComponent as Subscription} from "./icons/subscription.svg";
import {ReactComponent as WatchLater} from "./icons/watch_later.svg";

type Props = {
  icon: string;
}

const NavbarStudyStudioSVGSelector = ({ icon }: Props) => {
  switch (icon) {
  case "menu":
    return (
      <Menu />
    );
  case "close":
    return ( 
      <Close/>
    );
  case "home":
    return ( 
      <Home/>
    );
  case "categories":
    return ( 
      <Categories/>
    );
  case "subscription":
    return ( 
      <Subscription/>
    );
  case "hat_mylesson":
    return ( 
      <HatMylesson/>
    );
  case "watch_later":
    return ( 
      <WatchLater/>
    );
  case "my_lesson":
    return ( 
      <MyLesson/>
    );
  case "management":
    return ( 
      <Management/>
    );
  default:
    return <svg></svg>;
  };
};

export default NavbarStudyStudioSVGSelector;
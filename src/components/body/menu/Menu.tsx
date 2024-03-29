import "./menu.scss";
import {ReactComponent as MenuIcon} from "../../icons/menu.svg";

type MenuProps = {
  setIsMenuActive: (boolean: boolean) => void;
  isMenuActive: boolean;
}
export const Menu = ({setIsMenuActive, isMenuActive}: MenuProps) => {

  return (
    <div
      className="main-menu"
      onClick={() => {
        setIsMenuActive(!isMenuActive);
      }}
    >
      <MenuIcon/>
    </div>
  );
};
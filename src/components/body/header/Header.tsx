import {Link} from "react-router-dom";
import "./Header.css";
import Button from "../../Button";
import Logo from "../../icons/Logo.svg";
import Bell from "../../icons/Bell.svg";
import Avatar from "../../icons/Avatar.svg";
import {useAppSelector} from "../../../store/hooks";
import Magnifier from "../../icons/blackMagnifier.svg";

const Header = () => {
  const isDefaultPage = useAppSelector(state => state.value.isDefaultHeader);
  const page = useAppSelector(state => state.value.page);
  const userButtonText = page === 'sectionPage' ? 'My studio' : 'Go study'

  return (
    <div className="side-bar">
      <div className='menu'>
        <span className='menu-active'></span>
      </div>
      <div className='header'>
        <Link to='/n' className='logo-name'>
          <img className='logo' src={Logo} alt='Logo'/>
          <h4 className='title-header'>The lessoner</h4>
          {(page === 'myPage' && isDefaultPage) && <Link to={'/myStudio'} className='my-studio'>My studio</Link>}
        </Link>
        <div className='search-button'>
          <Link to='/search' className='magnifier'>
            <img src={Magnifier} alt='search'/>
          </Link>
          <input className='search' type='text' placeholder='Search'/>
          {isDefaultPage ?
            <div className='user-item'>
              {page &&
                <Link to='/' className='section-button'>
                  <Button buttonType='button' buttonText={userButtonText} className='user-button'/>
                </Link>}
              <img src={Bell} alt='Bell' className='bell'/>
              <img src={Avatar} alt='Avatar' className='avatar'/>
            </div>
            :
            <Link to="/users/sign_in" className='login-link'>
              <img src={Avatar} alt='Avatar' className='avatar-login'/>
              <Button buttonType='button' buttonText='Log in' className='button-login'/>
            </Link>}
        </div>
      </div>
    </div>
  );
};
export default Header;



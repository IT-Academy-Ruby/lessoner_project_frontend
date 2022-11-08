import {Link, useNavigate} from "react-router-dom";
import "./Header.scss";
import Button from "../../Button";
import Logo from "../../icons/Logo.svg";
import Bell from "../../icons/Bell.svg";
import Avatar from "../../icons/Avatar.svg";
import {useAppSelector, useAppDispatch} from "../../../store/hooks";
import Magnifier from "../../icons/blackMagnifier.svg";
import {useEffect} from "react";
import {showStudentPage} from "../../../store/header/headerSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isDefaultPage = useAppSelector(state => state.value.isDefaultHeader);
  const page = useAppSelector(state => state.value.page);
  const localJWT = useAppSelector(state => state.login.login);
  const userButtonText = page === 'sectionPage' ? 'My studio' : 'Go study';

  useEffect(() => {
    if (localStorage.getItem('JWT')) {
      navigate('');
      dispatch(showStudentPage());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDefaultPage, localJWT]);

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



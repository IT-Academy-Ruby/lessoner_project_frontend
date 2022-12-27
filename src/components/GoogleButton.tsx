import "../pages/modal.scss";
import Google from "../components/icons/google.svg";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleButton = () => {
  const login = useGoogleLogin({ onSuccess: tokenResponse => console.log(tokenResponse) });
  return (
    <div className="app-logo" onClick={() => login()}>
      <img src={Google} alt="google" />
    </div>
  );
};

export default GoogleButton;
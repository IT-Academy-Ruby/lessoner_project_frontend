import "../pages/modal.scss";
import VK from "../components/icons/vk.svg";
import getParameterValue from "../helpers/parseUrl";
import { useEffect } from "react";

const VKButton = () => {
  const {
    REACT_APP_REDIRECT_URL, REACT_APP_FRONTEND, REACT_APP_VK_ID
  } = process.env;
  useEffect(() => {
    const code = getParameterValue(window.location.href, "code");
    const error = getParameterValue(window.location.href, "error");

    if (code) {
      console.log(code);
    }
    else if (error) {
      window.location.href = `${REACT_APP_FRONTEND}/user/sign_up`;
    }
  }, [REACT_APP_FRONTEND]);

  const handleRedirect = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${REACT_APP_VK_ID}
    &display=popup&redirect_uri=${REACT_APP_REDIRECT_URL}&scope=email&response_type=code&
    v=5.120&state=4194308`;
  };

  return (
    <div className="app-logo" onClick={handleRedirect}>
      <img src={VK} alt="vk" />
    </div>
  );
};

export default VKButton;
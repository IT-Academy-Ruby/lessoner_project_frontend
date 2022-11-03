import { useEffect } from "react";
import getVKCode from "../helpers/parseUrl";
import { REDIRECT_URL, VK_APP } from "../constants";

const VKButton = () => {

  useEffect(() => {
    const code = getVKCode(window.location.href)!;

    if (code) {
      console.log(code);
    }
    else {
      window.location.href !== REDIRECT_URL && (window.location.href = REDIRECT_URL);
    }
  }, []);

  const handleRedirect = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${VK_APP.id}&display=popup&redirect_uri=${REDIRECT_URL}&scope=email&response_type=code&v=5.120&state=4194308`;
  };

  return (
    <div>
      <button onClick={handleRedirect}>Continue with VK</button>
    </div>
  );
};

export default VKButton;
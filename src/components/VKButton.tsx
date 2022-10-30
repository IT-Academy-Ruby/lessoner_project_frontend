import getVKCode from "../helpers/parseUrl";
import { REDIRECT_URL, VK_APP, BACKEND_URL } from "../constants";

const VKButton = () => {
  const handleRedirect = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${VK_APP.id}&display=popup&redirect_uri=${REDIRECT_URL}&scope=email&response_type=code&v=5.120&state=4194308`;
    const code = getVKCode(window.location.href)!;
    if (code) console.log(code);
    else if (code === null) window.location.href = BACKEND_URL;
  };

  return (
    <div>
      <button onClick={handleRedirect}>Continue with VK</button>
    </div>
  );
};

export default VKButton;
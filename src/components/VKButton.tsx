import { useEffect } from "react";
import getVKCode from "../helpers/parseUrl";

import { CB_SOCIAL_MEDIA, VK_APP, BACKEND_URL } from "./constants";
const VKButton = () => {

  useEffect(() => {
    const code = getVKCode(window.location.href)!;
    if (code) console.log(code);
    else if (code === null) window.location.href = BACKEND_URL;
  }, [window.location.href]);

  const handleRedirect = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${VK_APP.id}&display=popup&redirect_uri=${CB_SOCIAL_MEDIA}&scope=email&response_type=code&v=5.120&state=4194308`;
  };

  return (
    <div>
      <button onClick={handleRedirect}>Continue with VK</button>
    </div>
  );
};

export default VKButton;
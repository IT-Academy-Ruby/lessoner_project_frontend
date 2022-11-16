import { useGoogleLogin } from "@react-oauth/google";

const GoogleButton = () => {
  const login = useGoogleLogin({onSuccess: tokenResponse => console.log(tokenResponse)});
  return (
    <div>
      <button onClick={() => login()}>Continue with Google</button>
    </div>
  );
};

export default GoogleButton;
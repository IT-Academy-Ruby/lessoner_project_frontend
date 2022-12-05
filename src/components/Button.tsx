import "./button.scss";
import {MouseEventHandler,Fragment} from "react";

type ButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?:boolean;
}

const Button = ({
  buttonType, buttonText, onClick, className, disabled=false
}: ButtonProps) => {
  return (
    <Fragment>
      <button
        type={buttonType}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </Fragment>
  );
};

export default Button;
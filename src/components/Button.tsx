import "./button.scss";
import {Fragment, MouseEventHandler} from "react";

type ButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  disabled?:boolean;
  buttonIcon?: React.ReactNode;
}

const Button = ({
  buttonType, buttonText, onClick, className, disabled=false, buttonIcon
}: ButtonProps) => {
  return (
    <Fragment>
      <button
        type={buttonType}
        className={className}
        onClick={onClick}
        disabled={disabled}
      >
        
        {buttonIcon}
        {buttonText}
      
      </button>
    </Fragment>
  );
};

export default Button;
import "./button.scss";
import {MouseEventHandler} from "react";

type ButtonProps = {
  buttonType: "button" | "submit" | "reset";
  buttonText: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const Button = ({
  buttonType, buttonText, onClick, className
}: ButtonProps) => {
  return (
    <div>
      <button type={buttonType} className={className} onClick={onClick}>{buttonText}</button>
    </div>
  );
};
export default Button;
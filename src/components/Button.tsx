import "./button.scss";
import { Fragment, MouseEventHandler } from "react";

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
    <Fragment>
      <button type={buttonType} className={className} onClick={onClick}>{buttonText}</button>
    </Fragment>
  );
};
export default Button;
import "./button.scss"
import {MouseEventHandler} from "react";

type ButtonProps = {
  buttonType: 'button' | 'submit' | 'reset';
  buttonText: string;
  onClick?: MouseEventHandler <HTMLButtonElement>;
}

const Button = ({buttonType, buttonText, onClick}: ButtonProps) => {
  return (
    <div>
      <button type={buttonType} className='button' onClick={onClick}>{buttonText}</button>
    </div>
  )
}
export default Button;
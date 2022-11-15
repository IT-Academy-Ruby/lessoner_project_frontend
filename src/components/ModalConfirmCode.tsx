import "./ModalConfirmCode.scss";
import React,  {
  FC, useEffect, useState
} from "react";
interface CardProps {
  isActive: boolean;
  setIsActive: (bool: boolean) => void;
}

const ModalConfirmCode: FC<CardProps> = 
  ({isActive, 
    setIsActive,}) => {
  
    const [code, setCode] = useState("");
    const [codeIsDirty, setCodeISDirty] = useState(false);
    const [codeError, setCodeError] = useState("The input field must be filled");
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
      setIsFormValid(!codeError);
    }, [codeError]);

    const sendCode = () => {
      setIsActive(false);
    };

    const blurHandler = () => {
      setCodeISDirty(true);
    };

    const codeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCode(value);
      if (value.length !== 5) {
        setCodeError("Code must contain 5 characters");
        if (!value) {
          setCodeError("The input field must be filled");
        }
      } else {
        setCodeError("");
      }
    };

    return (
      <div 
        className={isActive ? "modal active" : "modal"}
        onClick={() => setIsActive(false)}  
      >
        <div 
          className={isActive ? "modal__content active" : "modal__content"}
          onClick={e => e.stopPropagation()}
        >
          <div className="confirmcode__content">
            <h1 className="confirmcode__title">
            Enter the code
            </h1>
            <p className="confirmcode__text">
            Now a code will come to your phone. Enter it in a line.   
              <span> 
                <a href="#!" className="confirmcode__link-change">
                To change number
                </a>
              </span>
            </p>
            <form>
              <label  className="confirmcode__label">
                <span className="confirmcode__label-text">
                Code
                </span> 
                <input
                  name='code'
                  value={code}
                  onChange={e => {
                    setCode(e.target.value);
                    codeHandler(e);
                  }}
                  onBlur={blurHandler} 
                  type="text"
                  placeholder='Enter code' 
                  className="confirmcode__input" 
                />
                {(codeIsDirty && codeError) && <div className='error'>{codeError}</div>}
              </label>
            
              <a href="#!" className="confirmcode__link-resend">
                Resend code
              </a>
              <button
                type='submit'
                disabled={!isFormValid}
                onClick={sendCode}
                className="confirmcode__finish"
              >
              Finish
              </button>
            </form>
          </div>
        </div>  
      </div>
    );
  };

export default ModalConfirmCode;
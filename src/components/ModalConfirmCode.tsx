import { connected } from 'process';
import React,  {FC, useEffect, useState} from 'react';
import './ModalConfirmCode.scss';

interface CardProps {
  active: boolean;
  setActive: (bool: boolean) => void;
}

const ModalConfirmCode: FC<CardProps> = 
  ({
    active, 
    setActive,
  }) => {
  
  const [code, setCode] = useState('');
  const [codeDirty, setCodeDirty] = useState(false);
  const [codeError, setCodeError] = useState('The input field must be filled');
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
      setFormValid(!codeError);
  }, [codeError])

  const sendCode = () => {
    setActive(false);
  }

  const blurHandler = () => {
    setCodeDirty(true);
  }

  const codeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
    if (e.target.value.length != 5) {
      setCodeError('Code must contain 5 characters');
      if (!e.target.value) {
        setCodeError('The input field must be filled');
      }
    } else {
      setCodeError('');
    }
  }

  return (
    <div 
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}  
    >
      <div 
        className={active ? 'modal__content active' : 'modal__content'}
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
                minLength={5}
                required
              />
              {(codeDirty && codeError) && <div className='error' style={{color: 'red'}}>{codeError}</div>}
            </label>
            
            <a href="#!" className="confirmcode__link-resend">
                Resend code
            </a>
            <button
              type='submit'
              disabled={!formValid}
              onClick={sendCode}
              className="confirmcode__finish"
            >
              Finish
            </button>
          </form>
        </div>
      </div>  
    </div>
  )
}

export default ModalConfirmCode;
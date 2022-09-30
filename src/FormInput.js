import {useState} from "react";
import open_eye from "./icons/open_eye.png"
import close_eye from "./icons/close_eye.png"

let password = null;
const FormInput = ({label, type, required, name, validation}) => {
  const [field, setField] = useState('');
  const [fieldError, setFieldError] = useState(false);
  const [fieldBlur, setFieldBlur] = useState(false);

  const fieldHandler = (e) => {
    setField(e.target.value);
    if (e.target.name === 'Password') {
      password = e.target.value;
    }
    if (e.target.name === 'Password' ? !validation.test(e.target.value) : password !== e.target.value) {
      setFieldError(true);
      // e.target.style.outlineColor = 'red';
      e.target.style.borderColor = 'red';
    } else {
      setFieldError(false);
      // e.target.style.outlineColor = 'black';
      e.target.style.borderColor = '#0747a6';
    }
  }

  const blurHandler = (e) => {
    if (e.target.name === label) {
      setFieldBlur(true);
      // if(fieldError ===true){
      //   e.target.style.outlineColor = 'red';
      // }
    }
  }
  const showPassword = (e) => {
    const prev = e.target.previousElementSibling;
    if (prev.name === 'Password' || prev.name === 'Confirm password') {
      if (prev.type === 'password') {
        prev.type = 'text';
        e.target.src = open_eye;
      } else {
        prev.type = 'password';
        e.target.src = close_eye;
      }
    }
  }

  return (
    <div style={{margin: '20px 0'}}>
      {(fieldError && fieldBlur) && <div style={{color: 'red'}}>{label} entered incorrectly</div>}
      <label style={{display: 'block', fontWeight: 'bold', margin: '5px 0'}}>{label}</label>
      <input onChange={e => fieldHandler(e)}
             onBlur={e => blurHandler(e)}
             name={label} value={field}
             type={type}
             required={required}
             style={{
               width: '100%',
               boxSizing: 'border-box',
               padding: '0.5em',
               border: '1px solid #0747a6',
               borderRadius: '0.2em'
             }}/>
      {name === 'hidden' && <img alt='' src={close_eye} style={{
        display: 'inline-block',
        position:'relative',
        marginBottom:'-0.5em',
        width: '1.5em',
        height: '1.5em',
        borderRadius: '50%',
        marginLeft: '-2em'
      }} onClick={e => showPassword(e)}/>}
    </div>
  )
}
export default FormInput;
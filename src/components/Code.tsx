import {CODE} from "../constants";
import "./code.scss";

type CodeProps = {
  field?: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
  };
  error?: string;
}

const Code = ({field, error}: CodeProps) => {
  return (
    <div className='code'>
      <label className='codeLabel'> Code
        <input type='text'
               className='codeInput'
               maxLength={CODE.maxLength}
               {...field}
        />
        {error && <span className='error'>{error}</span>}
      </label>
    </div>
  )
}
export default Code;
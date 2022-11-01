import {CODE} from "../constants";
import "./code.scss";

type CodeProps = {
  field?: {
    name: string,
    onBlur: ()=>void,
    onChange: ()=>void,
    value: string,
  };
  error?: string;
}

const Code = ({field, error}: CodeProps) => {
  return (
    <div className='code'>
      <label className='code-label'> Code
        <input type='text'
               className='code-input'
               maxLength={CODE.maxLength}
               {...field}
        />
        {error && <span className='error'>{error}</span>}
      </label>
    </div>
  )
}
export default Code;
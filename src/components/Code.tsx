import "./input.scss";
import {CODE} from "../constants";
import {FormattedMessage} from "react-intl";

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
    <label className="input-label">
      <FormattedMessage id="app.code.name"/>
      <input
        type="text"
        className="input"
        maxLength={CODE.maxLength}
        {...field}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Code;
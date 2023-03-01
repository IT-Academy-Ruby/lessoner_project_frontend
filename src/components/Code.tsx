import "./input.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {CODE} from "../constants";
import classNames from "classnames";

type CodeProps = {
  field: {
    name: string,
    onBlur: React.FocusEventHandler<HTMLInputElement>,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: string,
  };
  error?: string;
}

const Code = ({field, error}: CodeProps) => {
  const intl = useIntl();
  return (
    <label className="input-label">
      <FormattedMessage id="app.code.name"/>
      <input
        type="text"
        className={classNames("input", {"invalid-input": error},
          {"success-input": !error && field.value})}
        maxLength={CODE.maxLength}
        placeholder={intl.formatMessage(
          { id: "app.сode.placeholder" },{maxSymbol: CODE.maxLength})}
        {...field}
      />
      {error && <span className="error-message">{error}</span>}
    </label>
  );
};

export default Code;
import "./userPage.scss";
import {FormattedMessage, useIntl} from "react-intl";
// import Birthday from "../../../BirthdayPicker";
// import UserName from "../../../UserName";

const UserPage = () => {
  const intl = useIntl();
  return (
    <div className="user-page">
      <h1 className="title-user-page">
        <FormattedMessage id="app.userPage.editInformation"/>
      </h1>
      <div className="avatar-field">
        <div className="avatar-user-page">
          <img src="" className="user-avatar" alt="avatar"/>
        </div>
        <span className="inform-avatar">
          <FormattedMessage id="app.userPage.avatarInformation"/>
        </span>
      </div>
      <div className="user-data">
        <div className="name-user-page">
          <label className="input-label">
            <FormattedMessage id="app.UserName"/>
            <input type="text" className="input"/>
          </label>
        </div>
        <div className="birthday-user-page">
          <label className="input-label">
            <FormattedMessage id="app.userPage.birthday"/>
            <input type="text" className="input"/>
          </label>
        </div>
      </div>
    </div>
  );
};
export default UserPage;
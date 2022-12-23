import "./userPage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Route, Routes} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import Button from "../../../Button";
import FormUserPage from "./FormUserPage";
import {getUserData} from "../../../../store/loginName/loginSlice"
import {useEffect, useState} from "react";

const UserPage = () => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const userName = useAppSelector(state => state.userDecodedName.session.name);
  const user = useAppSelector(state => state.userData.user);
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState("");

  useEffect(() => {
    if (userName) {
      dispatch(getUserData(userName));
    }
  }, [userName]);

  const dataUser = [
    {value: user.name, title: intl.formatMessage({id: "app.UserName"})},
    {value: new Date(user.birthday).toLocaleDateString(), title: intl.formatMessage({id: "app.userPage.birthday"})},
    {value: user.gender, title: intl.formatMessage({id: "app.userPage.gender"})},
    {value: user.email, title: intl.formatMessage({id: "app.email.name"})},
    {value: user.phone, title: intl.formatMessage({id: "app.phoneNumber.label"})},
    {value: "**********", title: intl.formatMessage({id: "app.passwordAndConfirm.pass"})},
  ];

  let keyField = dataUser.length;

  const handleEdit = (value: string, name: string) => {
    setIsVisible(true);
    setComponent(value);
  };

  return (
    <div className="wrapper-user_page">
      <div className="user-page">
        <h1 className="title-user-page">
          <FormattedMessage id="app.userPage.editInformation"/>
        </h1>
        <div className="avatar-field">
          <div className="avatar-user-page">
            <img src={user.avatar_url} className="user-avatar" alt="avatar"/>
          </div>
          <span className="inform-avatar">
          <FormattedMessage id="app.userPage.avatarInformation"/>
        </span>
        </div>
        {dataUser.map(data => {
            --keyField;
            return <div key={keyField}>
              <div className="user-page-field">
                <div className="name-user-page">
                  <p className="label-user-page">
                    {data.title}
                  </p>
                  <p className="user-page-data">
                    {data.value}
                  </p>
                </div>
                <Button
                  buttonText={intl.formatMessage({id: "app.userPage.edit"})}
                  className="button-select"
                  buttonType="button"
                  onClick={() => handleEdit(data.title, data.value)}/>
              </div>
              {keyField !== 0 && <hr className="line-user-page"/>}
            </div>
          }
        )}
      </div>
      <FormUserPage
        component={component}
        isVisible={isVisible}
        setIsVisible={setIsVisible}/>
    </div>
  );
};
export default UserPage;
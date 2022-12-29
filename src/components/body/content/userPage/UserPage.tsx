import "./userPage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {Route, Routes} from "react-router-dom";
import {getUserData, uploadFile} from "../../../../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {useEffect, useRef, useState} from "react";
import Button from "../../../Button";
import FormUserPage from "./FormUserPage";
import Upload from "../../../icons/upload.svg";

const UserPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
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
  }, [dispatch,userName]);

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
  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };
  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && user.name) {
      const userData = {
        name: user.name,
        file: event.target.files
      };
      dispatch(uploadFile(userData));
      dispatch(getUserData(userName));
    }
  };

  return (
    <div className="wrapper-user_page">
      <div className="user-page">
        <h1 className="title-user-page">
          <FormattedMessage id="app.userPage.editInformation"/>
        </h1>
        <div className="avatar-field">
          <input
            ref={fileRef}
            type="file"
            className="category-file"
            accept=".jpg, .gif, .png"
            onChange={(event) => {
              handleSelectFile(event);
            }}
          />
          <div className="avatar-user-page">
            <img src={user.avatar_url} className="user-avatar" alt="avatar"/>
            <div className="upload-field" onClick={handleUpload}>
              <img src={Upload} alt="upload" className="upload-avater"/>
            </div>
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
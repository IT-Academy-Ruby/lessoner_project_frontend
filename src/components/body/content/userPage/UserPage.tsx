import "./userPage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {getUserData, uploadFile} from "../../../../store/loginName/loginSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
  useEffect, useRef, useState
} from "react";
import BirthdayForm from "./forms/BirthdayForm";
import Button from "../../../Button";
import CodeForm from "./forms/CodeForm";
import EmailForm from "./forms/EmailForm";
import GenderForm from "./forms/GenderForm";
import NameForm from "./forms/NameForm";
import PasswordForm from "./forms/PasswordForm";
import PhoneForm from "./forms/PhoneForm";
import Upload from "../../../icons/upload.svg";
import classNames from "classnames";

const UserPage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const nameDecode = useAppSelector(state => state.userDecodedName.session.name);
  const user = useAppSelector(state => state.dataUser.user);
  const track = useAppSelector(state => state.dataUser.updateAfterRequest);
  const [isVisible, setIsVisible] = useState(false);
  const [component, setComponent] = useState("");

  const formatter = new Intl.DateTimeFormat("ru");

  useEffect(() => {
    if (nameDecode) {
      dispatch(getUserData(nameDecode));
    }
  }, [dispatch, nameDecode, track]);

  const dataUser = [
    {value: user.name,
      title: intl.formatMessage({id: "app.UserName"})},
    {value: user.birthday ? formatter.format(new Date(user.birthday)) : null,
      title: intl.formatMessage({id: "app.userPage.birthday"})},
    {value: user.gender,
      title: intl.formatMessage({id: "app.userPage.gender"})},
    {value: user.email,
      title: intl.formatMessage({id: "app.email.name"})},
    {value: user.phone,
      title: intl.formatMessage({id: "app.phoneNumber.label"})},
    {value: "**********",
      title: intl.formatMessage({id: "app.passwordAndConfirm.pass"})},
  ];
  const element = () => {
    switch (component) {
    case (intl.formatMessage({id: "app.UserName"})):
      return <NameForm userName={user.name} handleClose={handleClose}/>;
    case (intl.formatMessage({id: "app.userPage.birthday"})):
      return <BirthdayForm userName={user.name} handleClose={handleClose}/>;
    case (intl.formatMessage({id: "app.userPage.gender"})):
      return <GenderForm userName={user.name} handleClose={handleClose}/>;
    case (intl.formatMessage({id: "app.email.name"})):
      return <EmailForm userName={user.name} handleClose={handleClose}/>;
    case (intl.formatMessage({id: "app.phoneNumber.label"})):
      return <PhoneForm userName={user.name} handleClose={handleClose} handleEdit={handleEdit}/>;
    case (intl.formatMessage({id: "app.passwordAndConfirm.pass"})):
      return <PasswordForm userName={user.name} handleClose={handleClose}/>;
    case ("code"):
      return <CodeForm userName={user.name} handleClose={handleClose}/>;
    };
  };

  let keyField = dataUser.length;
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleEdit = (title: string) => {
    setIsVisible(true);
    setComponent(title);
  };

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && user.name) {
      const userData = {name: user.name, file: event.target.files};
      dispatch(uploadFile(userData));
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
            {user.avatar_url && <img
              src={user.avatar_url}
              className="user-avatar"
              alt="avatar"
            />}
            {!user.avatar_url && <p className="first-letters">{user.name}</p>}
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
                onClick={() => handleEdit(data.title)}/>
            </div>
            {keyField !== 0 && <hr className="line-user-page"/>}
          </div>;
        }
        )};
      </div>
      <div className={classNames("wrapper-form-user-page", {"inVisible": !isVisible})}>
        {element()}
      </div>
    </div>
  );
};
export default UserPage;
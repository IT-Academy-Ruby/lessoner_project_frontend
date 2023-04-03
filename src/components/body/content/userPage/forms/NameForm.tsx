import "../userPage.module.scss";
import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {Button} from "../../../../Button";
import {USERNAME} from "../../../../../constants";
import {UserName} from "../../../../UserName";
import {UserRegex} from "../../../../../validationRules";
import {editUserData} from "../../../../../store/loginName/loginSlice";

interface FormValues {
  name: string;
}

interface FormErrors {
  [key: string]: string;
}

type NameFormProps = {
  userName: string;
  handleClose: () => void;
}

export const NameForm = ({userName, handleClose}: NameFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const isUser = useAppSelector((state) => state.login.isLogged);

  const initialValues: FormValues = {name: ""};
  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};
        if (UserRegex.test(values.name)) {
          errors.name = intl.formatMessage({id: "app.YourselfPage.errorIncorrectName"});
        }
        if (values.name.length === 0) {
          errors.name = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
        }
        if (values.name.length < USERNAME.minLength && values.name.length > 0) {
          errors.name = intl.formatMessage(
            {id: "app.YourselfPage.errorSmallName"}, {minSymbol: USERNAME.minLength});
        }
        if (values.name.length > USERNAME.maxLength) {
          errors.name = intl.formatMessage({id: "app.YourselfPage.errorIncorrectName"});
        }
        if (isUser) {
          errors.name = intl.formatMessage({id: "app.userName.nameExists"});
        }

        return errors;
      }}
      onSubmit = {(values) => {
        const items = {name: userName, object: {name: values.name}};
        dispatch(editUserData(items));
        handleClose();
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={handleClose}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.username" />
            </h2>
            <Field
              name="name"
              component={UserName}
              error={touched.name ? errors.name : undefined}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form.button.username"})}
              className="button__page button-form-user__page"
            />
          </Form>);
      }}
    </Formik>
  );
};
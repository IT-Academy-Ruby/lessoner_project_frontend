import {
  Field, Form, Formik,
} from "formik";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import Gender from "../../../../GenderSelector";
import {editUserData} from "../../../../../store/loginName/loginSlice";
import {useAppDispatch} from "../../../../../store/hooks";
import {useState} from "react";

const gender = [
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.male"/>,
    genderValue: "male"
  },
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.female"/>,
    genderValue: "female"
  },
  {
    name: "gender",
    label: <FormattedMessage id="app.gender.other"/>,
    genderValue: "other"
  }];

interface FormValues {
  gender: string;
}

interface FormErrors {
  [key: string]: string;
}

type GenderFormProps = {
  userName: string;
  handleClose: () => void;
}

const GenderForm = ({userName, handleClose}: GenderFormProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const [isDisable, setIsDisable] = useState(true);

  const initialValues: FormValues = {gender: ""};

  return (
    <Formik
      initialValues={initialValues}
      validate={async (values: FormValues) => {
        const errors: FormErrors = {};

        if (!values.gender) {
          errors.gender = intl.formatMessage({id: "app.YourselfPage.errorFieldEmpty"});
        }
        if (values.gender && !errors.gender) {
          setIsDisable(false);
        } else {
          setIsDisable(true);
        }
      }}
      onSubmit={(values) => {
        const items = {name: userName, object: {gender: values.gender}};
        dispatch(editUserData(items));
        handleClose();
      }}>
      {({errors, touched}) => {
        return (
          <Form className="form-user-page">
            <div className="close-modal-form" onClick={() => handleClose()}>
              <span className="close-form"></span>
            </div>
            <h2 className="form-title-user-page">
              <FormattedMessage id="app.userPage.form.gender" />
            </h2>
            <Field
              name="name"
              options={gender}
              component={Gender}
              error={touched.gender ? errors.gender : undefined}
            />
            <Button
              buttonType="submit"
              buttonText={intl.formatMessage({id: "app.userPage.form..button.gender"})}
              className="button__page button-form-user__page"
              disabled={isDisable}
            />
          </Form>);
      }}
    </Formik>
  );
};

export default GenderForm;
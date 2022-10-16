import { useState } from "react";
import { Formik, Form, Field } from 'formik';
import Email from "./Email";
import PasswordAndConfirm from './PasswordAndConfirm';
import Checkbox from './Checkbox';
import './FirstRegistrationForm.scss';

interface FormValues {
	email: string;
	password: string;
	confirmPassword: string;
	termsAndConditions: boolean;
}

interface FormErrors {
	[key: string]: any
}

const emailInvalidationRules = [
	/^\s*$/, // check string not empty
	/^[^@]+$/, // @ should exist
	/@[^@]*@/, // onle one @ is admissible
	/^\./, // '.' can't be first symbol
	/\.{2,}.+(?=@)/, // '.' can't repeat more than once in a row
	/\.(?=@)/, // '.' can't be before @
	/[^A-Za-z0-9_!#$%&'.*+\-/=?\^`{|}~].*(?=@)/, // include only valid symbols before @
	/(?<=@).*[^a-z0-9\-.]/, // include only valid symbols before @
];

const minSymbol = 6;
const maxSymbol = 256;
const passwordRegex = new RegExp("^[-/=!#$%&'*+?^_`{|}~.A-Z0-9]{" + minSymbol + "," + maxSymbol + "}$", "i");

const FirstRegistrationForm = () => {
	const initialValues: FormValues = {
		email: '',
		password: '',
		confirmPassword: '',
		termsAndConditions: false
	}

	const validate = (values: FormValues) => {
		let errors: FormErrors = {};
		if (emailInvalidationRules.some(rule => rule.test(values.email))) {
			errors.email = 'Please enter a valid email address';
		}
		if (!passwordRegex.test(values.password)) {
			errors.password = `An invalid character is present in the password. Password must be between ${minSymbol} and ${maxSymbol} characters; upper or lower case Latin letters (a–z, A–Z);numbers from 0 to 9;symbols ! # $ % & ' * + - / = ? ^ _ \` { | } ~`;
		}
		if (values.password.length >= maxSymbol || values.password.length < minSymbol) {
			errors.password = `Password must be between ${minSymbol} and ${maxSymbol} characters`;
		}
		if (values.password !== values.confirmPassword) {
			errors.confirmPassword = 'Passwords do not match';
		}
		if (!(values.termsAndConditions)) {
			errors.termsAndConditions = 'You must consent to the processing of your personal data, in accordance with the Terms';
		}
		return errors;
	}

	const submitFirstStepForm = (values: FormValues) => {
		console.log('all values are correct');
	};

	return (
		<div>
			<Formik
				initialValues={initialValues}
				validateOnChange={false}
				validate={validate}
				onSubmit={submitFirstStepForm}
			>
				{({ errors, touched }) => {
					return (
						<Form className="First-Registration-Form">
							<Field name='email' component={Email} error={touched.email ? errors.email : undefined} />
							<Field name='password' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol} isConfirm={false} error={touched.password ? errors.password : undefined} />
							<Field name='confirmPassword' component={PasswordAndConfirm} minSymbol={minSymbol} maxSymbol={maxSymbol} isConfirm={true} error={touched.confirmPassword ? errors.confirmPassword : undefined} />
							<Field name='termsAndConditions' component={Checkbox} error={touched.termsAndConditions ? errors.termsAndConditions : undefined} />
							<button type="submit">Next</button>
						</Form>
					)
				}}
			</Formik>
		</div>
	)
};

export default FirstRegistrationForm;
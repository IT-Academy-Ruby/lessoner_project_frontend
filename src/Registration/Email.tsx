import React, { useState } from "react";
import './Email.scss';

type EmailProps = {
    isValid: boolean;
}

const Email = ({ isValid }: EmailProps) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChanges = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        (e.currentTarget.id === 'email') && (setValue(e.currentTarget.value));
    };

    const emailValidation = () => {
        const invalidationRools = [
            /^\s*$/, // check string not empty
            /^[^@]+$/, // @ should exist
            /@[^@]*@/, // onle one @ is admissible
            /^\./, // '.' can't be first symbol
            /\.{2,}.+(?=@)/, // '.' can't repeat more than once in a row
            /\.(?=@)/, // '.' can't be before @
            /[^A-Za-z0-9_!#$%&'.*+\-/=?\^`{|}~].*(?=@)/, // include only valid symbols before @
            /(?<=@).*[^a-z0-9\-.]/, // include only valid symbols before @
        ];

        if (invalidationRools.some(rule => rule.test(value))) {
            setError('Please enter a valid email address');
        } else if (isValid) {
            setError('This email address is already registered. Use the link “Already have an account?');
        } else {
            setError('');
        }
    };

    return (
        <div className="EmailWrapper">
            <label htmlFor="email" className="EmailLabel">Email</label>
            <input type="text" id="email" name="email" required maxLength={256} className={"EmailInput" + (error ? " invalidEmailInput" : "")} placeholder="username2gmail.com" value={value} onChange={handleChanges} onBlur={emailValidation} />
            {error && <div><span className='errorMessage'>{error}</span></div>}
        </div>
    )
};

export default Email;
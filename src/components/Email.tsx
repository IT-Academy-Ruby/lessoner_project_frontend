import React, { useState } from "react";
import './Email.scss';

const Email = () => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');

    const handleChanges = (e: React.FormEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setValue(e.currentTarget.value);
    };

    const emailValidation = () => {
        const invalidationRules = [
            /^\s*$/, // check string not empty
            /^[^@]+$/, // @ should exist
            /@[^@]*@/, // onle one @ is admissible
            /^\./, // '.' can't be first symbol
            /\.{2,}.+(?=@)/, // '.' can't repeat more than once in a row
            /\.(?=@)/, // '.' can't be before @
            /[^A-Za-z0-9_!#$%&'.*+\-/=?\^`{|}~].*(?=@)/, // include only valid symbols before @
            /(?<=@).*[^a-z0-9\-.]/, // include only valid symbols before @
        ];

        if (invalidationRules.some(rule => rule.test(value))) {
            setError('Please enter a valid email address');
        }
    };

    return (
        <div className="Email-Wrapper">
            <label htmlFor="email" className="Email-Label">Email</label>
            <input type="text" name="email" required minLength={3} maxLength={256} className={"Email-Input" + (error ? " invalid-Email-Input" : "")} placeholder="username@gmail.com" value={value} onChange={handleChanges} onBlur={emailValidation} />
            {error && <div><span className='error-Message'>{error}</span></div>}
        </div>
    )
};

export default Email;
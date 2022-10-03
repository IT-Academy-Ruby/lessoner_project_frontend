import React, {useState} from 'react';
import classes from './Checkbox.module.css';

const Checkbox = (props) => {
    const [checkbox, setCheckbox] = useState(false);
    return (
        <div className={classes.checkbox__wrapper}>
            <label className={classes.checkbox__label}>
                <input 
                    className={classes.checkbox__input}
                    type='checkbox'
                    name='Agree'
                    checked={checkbox}
                    onChange={e => setCheckbox(e.target.checked)} 
                    {...props}
                />
                <p>
                    I agree to the processing of my personal data in accordance with the Terms
                </p>
            </label>
        </div>
    );
}

export default Checkbox;
 
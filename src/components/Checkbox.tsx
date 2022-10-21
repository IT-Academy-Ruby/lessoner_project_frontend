import React, {useState} from 'react';
import classes from './Checkbox.module.scss';
import '../index.scss';

const Checkbox: React.FC = (props) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className={classes.wrapper}>
            <label className={classes.label}>
                <input 
                    className={classes.input}
                    type='checkbox'
                    name='Agree'
                    checked={isChecked}
                    onChange={e => setIsChecked(e.target.checked)} 
                    {...props}
                />
                <p>
                    I agree to the processing of my personal data in accordance with the <a href='#!'>Terms</a> 
                </p>
            </label>
        </div>
    );
}

export default Checkbox;
 
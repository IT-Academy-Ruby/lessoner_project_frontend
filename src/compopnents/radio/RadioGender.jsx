import React, {useState} from 'react';
import classes from './RadioGender.module.css'

const RadioGender = (props) => {
    const [radio, setRadio] = useState('Female');
    return (
        <div className={classes.gender__wrapper}>
            <label>
                <p className={classes.radio__title}>
                    Select Your Gender
                </p> 
                <div className={classes.radio__wrapper}>
                    <div className={classes.radio__item}> 
                        <input 
                            className={classes.radio__inner}
                            type='radio'
                            name='Male'
                            checked={radio === 'Male'}
                            onChange={e => setRadio(e.target.name)}
                            {...props} 
                        />
                        <p className={classes.radio__text}>
                            Male
                        </p>
                    </div>
                    <div className={classes.radio__item}> 
                        <input 
                            className={classes.radio__inner}
                            type='radio'
                            name='Female'
                            checked={radio === 'Female'}
                            onChange={e => setRadio(e.target.name)}
                            {...props} 
                        />
                        <p className={classes.radio__text}>
                            Female
                        </p>
                    </div>
                    <div className={classes.radio__item}> 
                        <input 
                            className={classes.radio__inner}
                            type='radio'
                            name='Other'
                            checked={radio === 'Other'}
                            onChange={e => setRadio(e.target.name)}
                            {...props} 
                        />
                        <p className={classes.radio__text}>
                            Other
                        </p>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default RadioGender;

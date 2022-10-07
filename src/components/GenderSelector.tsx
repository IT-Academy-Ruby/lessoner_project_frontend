import React, {useState} from 'react';
import classes from './GenderSelector.module.scss';
import '../index.scss';

const GenderSelector = (props) => {
    const [radio, setRadio] = useState('');
    const [radioError, setRadioError] = useState(''); 

    const blurHandler = () => {
        if (radio === "") {
            setRadioError('Please select Your gender');
        } else {
            setRadioError(''); 
        }
    }

    return (
        <div className={classes.gender__wrapper}>
            <label className={classes.label}> 
                <div className={classes.radio__wrapper}>
                    <p className={classes.radio__title}>
                        Select Your Gender
                    </p>
                    <div className={classes.radio__items}>
                        <div className={classes.radio__item}> 
                            <input 
                                className={classes.radio__inner}
                                type='radio'
                                name='Male'
                                checked={radio === 'Male'}
                                onChange={e => {
                                    setRadio(e.target.name);
                                    setRadioError('');
                                }}
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
                                onChange={e => {
                                    setRadio(e.target.name);
                                    setRadioError('');
                                }}
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
                                onChange={e => {
                                    setRadio(e.target.name);
                                    setRadioError('');
                                }}
                                {...props} 
                            />
                            <p className={classes.radio__text}>
                                Other
                            </p>
                        </div>
                    </div>
                </div>
                {(radioError) && <div style={{color: 'red'}}>{radioError}</div>}
                
            </label>
            {/* <input className={classes.button}
                    type="submit"
                    value="Finish"
                    onClick={e => {
                        e.preventDefault();
                        blurHandler();
                    }} 
                />  */} // for tests
        </div>
    );
}

export default GenderSelector;


import "../index.css";
import React, {useState} from "react";
import { FormattedMessage } from "react-intl";
import classes from "./GenderSelector.module.scss";

const GenderSelector: React.FC = (props) => {
  const [radio, setRadio] = useState<string>("");
  const [radioError, setRadioError] = useState<string>(""); 
  const GENDER = {
    MALE: "male",
    FEMALE: "female",
    OTHER: "other",
  };

  const getOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadio(e.target.name);
    setRadioError("");
  };

  return (
    <div className={classes.gender__wrapper}>
      <label className={classes.label}> 
        <div className={classes.radio__wrapper}>
          <p className={classes.radio__title}>
            <FormattedMessage id="app.genderSelector.gender" />
          </p>
          <div className={classes.radio__items}>
            <div className={classes.radio__item}>
              <label className={classes.radio__text}> 
                <input 
                  className={classes.radio__inner}
                  type='radio'
                  name={GENDER.MALE}
                  checked={radio === GENDER.MALE}
                  onChange={getOnChange}
                  {...props} 
                />
                                Male
              </label>
            </div>
            <div className={classes.radio__item}>
              <label className={classes.radio__text}> 
                <input 
                  className={classes.radio__inner}
                  type='radio'
                  name={GENDER.FEMALE}
                  checked={radio === GENDER.FEMALE}
                  onChange={getOnChange}
                  {...props} 
                />
                                Female
              </label>
            </div>
            <div className={classes.radio__item}> 
              <label className={classes.radio__text}>
                <input 
                  className={classes.radio__inner}
                  type='radio'
                  name={GENDER.OTHER}
                  checked={radio === GENDER.OTHER}
                  onChange={getOnChange}
                  {...props} 
                />
                                Other
              </label>
            </div>
          </div>
        </div>
        {(radioError) && <div style={{color: "red"}}>{radioError}</div>}
                
      </label>
    </div>
  );
};

export default GenderSelector;


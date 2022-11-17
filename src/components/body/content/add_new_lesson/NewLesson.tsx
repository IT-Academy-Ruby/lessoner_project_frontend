import "./new_Lesson.css";
import { Link } from "react-router-dom";
import Step1 from "./step1";
import Step2 from "./step2";
import { useState } from "react";

const NewLesson = () => {
  const [step, setStep] = useState(1);
  const [stepStatus,setstepStatus]=useState("Next step");
  const swapStepForm = () => {
    console.log("step"+step);
    if (step === 1) {
      setStep(2);
      document.getElementsByClassName("step1")[0].classList.remove("active");
      document.getElementsByClassName("step2")[0].classList.add("active");
      document.getElementsByClassName("next-step-button")[0].classList.add("active-step");
      setstepStatus("Next step");
    } else {
      setStep(1);
      document.getElementsByClassName("step2")[0].classList.remove("active");
      document.getElementsByClassName("step1")[0].classList.add("active");
    }
  };
  return (
    <div className="new-lesson-form">
      <div className="form-fields">
        <h2 className="h2-add-new-lesson">Add new Lesson</h2>
        <div className="show-active-step">
          <div className="step1 active">
            <div className="step-1 first-div-active" >Step 1</div>
            <div className="second-div-active">Get started</div>
          </div>
          <div className="div-arrow">
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1.28957 10.38L5.16957 6.49998L1.28957 2.61998C0.89957
                2.22998 0.89957 1.59998 1.28957 1.20998C1.67957 0.81998 2.30957
                0.81998 2.69957 1.20998L7.28957 5.79998C7.67957 6.18998 7.67957
                6.81998 7.28957 7.20998L2.69957 11.8C2.30957 12.19 1.67957 12.19
                1.28957 11.8C0.90957 11.41 0.89957 10.77 1.28957 10.38Z" fill="#5A5D72"/>
            </svg>
          </div>
          <div className="step2">
            <div className="step-2 first-div-active">Step 2</div>
            <div className="second-div-active">Lesson details</div>
          </div>
        </div>
        {step===1 ? <Step1 /> : <Step2 />}
        <div className="foot-div">
          <Link to="/myStudio">
            <input type="button" value="Cansel" className="button-shape cansel" />
          </Link>
          <input type="button" className="next-step-button active-step button-shape"
            value={stepStatus} onClick={swapStepForm}>
          </input>
        </div>
      </div>
    </div>
  );
};
export default NewLesson;

import "./new_Lesson.css";
import  { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { Step1 } from "./step1";
import Step2 from "./step2";
import requestApi from "../../../../services/request";

type dataType = {
  name:string,
  link:string,
  file:string,
  category:string,
  description:string,
  subtitles:string,
  subtitlesFile:string,
  disStatus1:boolean,
  stepStatus:boolean,
  id:number
}

const NewLesson = () => {
  const getCategorieUrl="https://Lessoner-project-2w3h.onrender.com/categories";
  const [ name, setName ] = useState("");
  const [ link, setLink ] = useState("");
  const [ file, setFile ] = useState("");
  const [ category, setCategory] = useState("");
  const [ description, setDescription ] = useState("");
  const [ categoryId, setCategoryId ] = useState(0);
  const [subtitles,setSubtitles] = useState("");
  const [subtitlesFile,setSubtitlesFile] = useState("");
  const [ step, setStep ] = useState(1);
  // const [ stepStatus, setstepStatus ] = useState("Next step");
  // const [ disStatusStep1, setDisStatusStep1 ] = useState(false);
  const  [allCategories, setAllCategoris ] = useState([]);
  // const [ stepStatusDis, setStepStatusDis ] = useState(true);
  const [ nextStepButtonDisabled, setNextStepButtonDisabled ] = useState(true);
  const [ addNewLessonDisabled, setAddNewLessonDisabled ] = useState(true);
  const intl=useIntl();
;

  const dataForBe = {
    title:name,
    video_link:link,
    category_id:categoryId,
    description:description,
    author_id:1,

  };
  const getLessonUrl = "https://Lessoner-project-2w3h.onrender.com/lessons";
  // useEffect(() => {
  //   const categories:any = requestApi(getCategorieUrl,"GET").then((response)=>{
  //     return(response.json());
  //   }).then((json)=>{
  //     setAllCategoris(json);
  //     return(json); 
  //   }).catch(error=>{
  //     console.log(error);
  //   });
  // },[]);
  // console.log(allCategories);
  const handleDataChangeStep1 = ( formData1:dataType ) => {


    setName(formData1.name);
    setLink(formData1.link);
    setFile(formData1.file);
    // setDisStatusStep1(formData1.disStatus1);
    // setStepStatusDis(formData1.stepStatus);

  };

  const handleDataChangeStep2 = ( data:dataType ) => {
    setCategory(data.category);
    setDescription(data.description);
    setSubtitles(data.subtitles);
    setSubtitlesFile(data.subtitlesFile);
    setCategoryId(data.id);
   
  };

  const click = () => {
    // eslint-disable-next-line max-len
    console.log("name:"+name,"link:"+link,"file:"+file,"category:"+category,"description:"+description,"subtitles lang:"+subtitles,"subtitlesFile:"+subtitlesFile,"id:"+categoryId);

    
    const categories:any = requestApi(getLessonUrl,"POST",dataForBe).then((response)=>{
      return(response.json());
    }).then((json) => {
      console.log(json);
      setAllCategoris(json);
      return(json); 
    }).catch(error => {
      console.log(error);
    });
  };
  
  const swapStepForm = () => {
    if (step === 1) {
      setStep(2);
      document.getElementsByClassName("step1")[0].classList.remove("active");
      document.getElementsByClassName("step2")[0].classList.add("active");
      // document.getElementsByClassName("next-step-button")[0].classList.add("active-step");
      // setstepStatus("Next step");
    } else {
      setStep(1);
      document.getElementsByClassName("step2")[0].classList.remove("active");
      document.getElementsByClassName("step1")[0].classList.add("active");
    }
  };
  return (
    <div className="new-lesson-form">
      <div className="form-fields">
        <h2 className="h2-add-new-lesson"> <FormattedMessage id="app.AddNewLesson"/></h2>
        <div className="show-active-step">
          <div className="step1 active">
            <div className="step-1 first-div-active" ><FormattedMessage id="app.Step1"/></div>
            <div className="second-div-active"><FormattedMessage id="app.GetStarted"/></div>
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
            <div className="step-2 first-div-active"><FormattedMessage id="app.Step2"/></div>
            <div className="second-div-active"><FormattedMessage id="app.LessonDetails"/></div>
          </div>
        </div>
        {step===1 ? <Step1 
          onChange={handleDataChangeStep1}
          setNextStepButtonDisabled={setNextStepButtonDisabled} /> :
          <Step2 
            onChange={handleDataChangeStep2} 
            setAddNewLessonDisabled={setAddNewLessonDisabled} 
            allCategories={allCategories}
            setCategoryId={setCategoryId} />}
        <div className="foot-div">
          <Link to="/myStudio">
            <input type="button" 
              className="button-shape cansel"
              value={intl.formatMessage({id: "app.cancel"})}></input> 
          </Link>
     
          {step===1 ? <div>{nextStepButtonDisabled==true ?
            <input type="button"
              disabled={nextStepButtonDisabled} 
              className="next-step-button  button-shape-2 "
              value={intl.formatMessage({id: "app.NextStep"})} 
              onClick={swapStepForm}  
              id="btn-add-new-lesson-next-step" ></input> :
            <input type="button"
              disabled={nextStepButtonDisabled} 
              className="next-step-button  button-shape-2 active-step "
              value={intl.formatMessage({id: "app.NextStep"})} 
              onClick={swapStepForm}  
              id="btn-add-new-lesson-next-step" ></input> }</div> :
            <div>{step!==1 ? 
              <div>{addNewLessonDisabled==true ? 
                <input type="button"
                  disabled={addNewLessonDisabled} 
                  className="next-step-button  button-shape-2 "
                  value={intl.formatMessage({id: "app.AddNewLesson"})} 
                  onClick={click} >
                </input>
                : 
                <input type="button"
                  disabled={addNewLessonDisabled} 
                  className="next-step-button  button-shape-2 active-step"
                  value={intl.formatMessage({id: "app.AddNewLesson"})} 
                  onClick={click} >
                </input>}</div> : 
              <div></div>}
            </div>}
        </div>
      </div>
    </div>
  );
};

export  default NewLesson ;

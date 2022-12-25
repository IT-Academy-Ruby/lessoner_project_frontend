import "react-responsive-modal/styles.css";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { LoadGrey } from "../../../svg/LoadGrey";
import { Loader } from "react-feather";
import { Modal } from "react-responsive-modal";
import { TopArrow } from "../../../svg/top-arrow";
import requestApi from "../../../../services/request";
import { useFormik } from "formik";


type categoriesType = {
  id:number,
  name:string,
  description:string,
  status:string
}
const formData2 = {
  category:"",description:"",subtitles:"",subtitlesFile:"", id:""
};
let simbolsLeft:any = 0;
const getCategorieUrl = "https://Lessoner-project-2w3h.onrender.com/categories";
// const getLessonUrl = "https://Lessoner-project-2w3h.onrender.com/lessons";
const Step2 = (props:any ) => {
  const  [allCategories, setAllCategoris ] = useState<categoriesType[]>([]);
  const [ showLoader, setShowLoader ] = useState(true);
  const [category, setCategory ] = useState("");
  const [ description, setDescription ] = useState("");


  useEffect(() => {
    const lessons:any = requestApi(getCategorieUrl,"GET").then((response)=>{
      return response.json();
    }).then((json) => {
      setAllCategoris(json);
      console.log(json);
      return json; 
    }).catch(error => {
      console.log(error);
    });
  },[]);

  useEffect(()=>{
    // eslint-disable-next-line max-len
    if(category !== "" && description !== "" && msgErrorCategory == "" && msgErrorDescription == ""){
      props.setAddNewLessonDisabled(false); 
    } else {
      props.setAddNewLessonDisabled(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[ category, description ] );


  const { onChange } = props;
  // const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false); 
  const [ open, setOpen ] = useState(false);
  const [ msgErrorCategory, setMSgErrorCategory ] = useState("");
  const [ msgErrorDescription, setMsgErrorDescription ] = useState("");

  const addCategoryOnDate = ( event:React.FormEvent ) => {
    const e=event?.target as HTMLInputElement;
    setCategory(e.value);
    formData2.category = e.value;
    onChange(formData2);
    
  };

  const addDescriptionOnDate = ( event:React.FormEvent ) => {
    const e = event?.target as HTMLInputElement;
    formData2.description = e.value;
    setDescription(e.value);
    simbolsLeft = e.value.length;
    onChange(formData2);
    const calc=e.value.matchAll(/#/g);


    if(e.value.length > 600){
      setMsgErrorDescription("The maximum description length is 600 simbols");
      document.getElementById("description")?.classList.add("error-border");
      document.getElementById("symbol-left2")?.classList.remove("symbol-left");
      document.getElementById("symbol-left2")?.classList.add("error-border-symbol");
    } else if(/^[а-яА-ЯёЁa-zA-Z0-9(!)$%&'"*+# -/=?^_`{|}.,@/<>:]*$/ug.test(e.value)===false){
      setMsgErrorDescription("The input field contain prohobited");
      document.getElementById("description")?.classList.add("error-border");
      document.getElementById("symbol-left2")?.classList.add("symbol-left");
    }  else if(Array.from(calc).length>10){
      setMsgErrorDescription("The maximum number of hashtags is 10");
      document.getElementById("description")?.classList.add("error-border");
      document.getElementById("symbol-left2")?.classList.add("symbol-left");
    }
    else {setMsgErrorDescription("");
      document.getElementById("description")?.classList.remove("error-border");
      document.getElementById("symbol-left2")?.classList.remove("error-border-symbol");
      document.getElementById("symbol-left2")?.classList.add("symbol-left");
      
    }
  };

  const addSubtitlesOnDate = ( event:React.FormEvent ) => {
    const e = event?.target as HTMLInputElement;
    formData2.subtitles = e.value;
    onChange(formData2);
  };

  const addSubtitlesFileOnDate = ( event:React.FormEvent ) => {
    const e = event?.target as HTMLInputElement;
    formData2.subtitlesFile = e.value;
    onChange(formData2);
  };

  const categoryCheck = ( event:React.FormEvent ) => {
    if (formData2.category === ""){
      setMSgErrorCategory("Must select a lesson category");
    } else { setMSgErrorCategory(""); }
  };
  
  const formik = useFormik({initialValues: {
    category: "",
    description:"",
    subtitles:"",
    subtitlesFile:""
  },
  
  onSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
  },});

  const closeIcon = (
    <svg onClick={onCloseModal} width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.77816 0.229428C9.48237 -0.0663631 9.00455 -0.0663631 8.70876 0.229428L5 3.9306L1.29124 0.221843C0.99545 -0.0739477 0.517634 -0.0739477 0.221843 0.221843C-0.0739477 0.517634 -0.0739477 0.99545 0.221843 1.29124L3.9306 5L0.221843 8.70876C-0.0739477 9.00455 -0.0739477 9.48237 0.221843 9.77816C0.517634 10.0739 0.99545 10.0739 1.29124 9.77816L5 6.0694L8.70876 9.77816C9.00455 10.0739 9.48237 10.0739 9.77816 9.77816C10.0739 9.48237 10.0739 9.00455 9.77816 8.70876L6.0694 5L9.77816 1.29124C10.0664 1.00303 10.0664 0.517634 9.77816 0.229428Z" fill="#9A9AA3"/>
    </svg>
  );
 
  const categoriesElements=allCategories.map(( elem ) => {
    return(<option value={elem.name}  key={elem.id} >
      <FormattedMessage id={"app.nameCategory."+elem.name}/>
    </option>);
  });

  const onSelectChange = (e: React.FormEvent) => {
    formik.handleChange(e);
    addCategoryOnDate(e);
    categoryCheck(e);
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-2">
          <div className="input-category marg-bot-32 w100">
            <select id="category" 
              name="category"
              className="w100"   
              onChange={onSelectChange}
              value={formik.values.category}
              placeholder="text" >
              <option value="Choose a category" selected hidden >
                <FormattedMessage id="app.ChooseACategory"/>
              </option>
              {categoriesElements} 
            </select>
            <div className="div-error-msg">{msgErrorCategory}</div>
          </div>
          <div className="input-description marg-bot-32 w100">
            <label htmlFor="description"><FormattedMessage id="app.Description"/></label>
            <textarea
              required
              // maxLength={600}
              id="description"
              name="description"
              onChange={(e)=>{formik.handleChange(e);addDescriptionOnDate(e);}}
              onFocus={(e)=>{categoryCheck(e);}}
              value={formik.values.description}
              className="description w100"
            />
            <div className="symbol-left" id="symbol-left2">{simbolsLeft}/600</div>
            <div className="div-error-msg">
              {msgErrorDescription}
            </div>
          </div>
          <div className="input-subtitles marg-bot-32" >
            <label htmlFor="subtitles" className="subtitles">
              <FormattedMessage id="app.Subtitles"/>
            </label>
            <span><FormattedMessage id="app.AddSubtitlesToReachBiggerAudience"/></span>
            <div className="button-shape-2 active-step subtitle-div" /*onClick={onOpenModal}*/ >
              <TopArrow/>
              <FormattedMessage id="app.AddSubtitles"/>
            </div>
          </div>
          <div className="input-thumbnail marg-bot-32">
            <label className="subtitles"><FormattedMessage id="app.Thumbnail"/></label>
            <span>
              <FormattedMessage id="app.SelectOrUploadAPictureThatShowsWhatsInYourVideo"/>
            </span>
            <div className="all-div-thumbnail">
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)} center closeIcon={closeIcon}>
          <div className="input-category marg-bot-32 w100">
            <label htmlFor="subtitles">Add subtitles</label>
            <span>Select subtitle language upload the file</span>
            <select id="subtitles" 
              name="subtitles"
              className="color-grey w100"   
              onChange={(e)=>{formik.handleChange(e);addSubtitlesOnDate(e);}}
              defaultValue={formik.values.subtitles} >
              <option value="Subtitles language" selected hidden >
              Subtitles language
              </option>
              <option value="English">English</option>
              <option value="Русский">Русский</option>
            </select>
          </div>
          <div className="load-file-div">
            <div>
              <LoadGrey/>
            </div>
            <div>Upload file</div>
            <div className="error"></div>
            <div className="last-load-div">
              <span>Drag and drop</span> 
              <span>or</span> 
              <input 
                id="subtitlesFile"
                name="subtitlesFile"
                type="file"
                onChange={(e)=>{formik.handleChange(e);addSubtitlesFileOnDate(e);}}
                value={formik.values.subtitlesFile} 
                hidden
              />
              <label htmlFor="subtitlesFile" className="button-shape" id="file-label">
                <TopArrow/>
               Select file</label>
            </div>
          </div>
          <div className="btn-form-add-subtitles">
            <input type="button" className="button-shape cansel" value="Cansel" 
              onClick={onCloseModal}/>
            <input type="button" className="disabled" disabled value="Continue"/>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default Step2;

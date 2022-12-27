import { FormattedMessage, useIntl } from "react-intl";
import {  useEffect, useState } from "react";
import { LoadGrey } from "../../../svg/LoadGrey";
import { TopArrow } from "../../../svg/top-arrow";
import { useFormik } from "formik";

const formData1 = {
  name:"", link:"", file:"",disStatus1:"" , stepStatus:true
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let simbolsLeft:any = 0;

const Step1 = (  props:any  ) => {
  const [ name, setName ] = useState("");
  const [link, setLink] = useState("");
  const { onChange } = props;
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [linkErrorMsg, setLinkErrorMsg] = useState("");
  const intl = useIntl();

  useEffect(() => {
    if ((name!=="") && (link!=="") && (nameErrorMsg==="")  && (linkErrorMsg==="") ){
      props.setNextStepButtonDisabled(false);
    } else {
      props.setNextStepButtonDisabled(true);
    }
  },[name, link, linkErrorMsg, nameErrorMsg, props]);

  const formik = useFormik(
    { initialValues: {
      name: "",
      link: "",
      file: "",
    },

    onSubmit: (values) => {
      console.log(JSON.stringify(values, null, 2));
    },}
  );

  const addNameOnDate = (event:React.FormEvent)=>{
    const e = event?.target as HTMLInputElement;
    formData1.name = e.value;
    simbolsLeft = e.value.length;
    disStatus();
    onChange(formData1);
  };

  const disStatus = () => {
    if (document.getElementById("name")?.classList.contains("error-border")===true){
      formData1.disStatus1 = "true";
    } else{
      formData1.disStatus1 = "";
    }
  };

  const addLinkOnDate = (event:React.FormEvent) => {
    const e = event?.target as HTMLInputElement;
    formData1.link = e.value;
    onChange(formData1); 
  };

  const addFileOnDate = (event:React.FormEvent) => {
    const e = event?.target as HTMLInputElement;
    formData1.file = e.value;
    onChange(formData1);
  };

  const nameError = ( event:React.FormEvent ) => {
    const e = event?.target as HTMLInputElement;
    const name = e.value;
    setName(name);
    if(/^[а-яА-ЯёЁa-zA-Z0-9(!)$%&'"*+#\\[\\ -\]\\/=?^_`{|}.,@/<>:]*$/ug.test(name)==false ){
      setNameErrorMsg("The input field contains prohibited characters");
      document.getElementById("name")?.classList.add("error-border");
    } else if( name==="" ){
      setNameErrorMsg("The input field contains prohibited characters");
      document.getElementById("name")?.classList.add("error-border");
    } else if(simbolsLeft>64){
      setNameErrorMsg("The maximum name length is 64 simbols");
      document.getElementById("name")?.classList.add("error-border");
      document.getElementById("simbol-left")?.classList.add("error-border-symbol");
    } else { 
      setNameErrorMsg("");
      document.getElementById("name")?.classList.remove("error-border"); 
      document.getElementById("simbol-left")?.classList.remove("error-border-symbol");
    }
  };
  
  const linkError = (event:React.FormEvent) => {
    formData1.file = ("");
    const e = event?.target as HTMLInputElement;
    setLink(e.value);
    formData1.link = e.value ;
    if( /^http:\/\//i.test(e.value) === true || /^https:\/\//i.test(e.value) === true  )
    {
      setLinkErrorMsg("");
      document.getElementById("link")?.classList.remove("error-border"); 
    } 
    else{ 
      setLinkErrorMsg("Please check the correctness of the link");
      document.getElementById("link")?.classList.add("error-border");  
    }
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-1">
          <div className="input-name">
            <label htmlFor="name"><FormattedMessage id="app.Name"/></label>
            <div className="name-div">
              <input 
                // maxLength={64}
                placeholder={intl.formatMessage({id: "app.Lessonname"})}
                maxLength={64} 
                id="name"
                name="name"
                type="text"
                onChange={(e)=>{formik.handleChange(e);addNameOnDate(e);nameError(e);}}
                onBlur={(e)=>{nameError(e);}}
                value={formik.values.name}
              ></input>
              <div className="simbol-left" id="simbol-left">{simbolsLeft}/64</div>
            </div>
            <div className="div-error-msg">{nameErrorMsg}</div>
          </div>
          <div className="input-link">
            <label htmlFor="link"><FormattedMessage id="app.LinkToTheVideo"/></label>
            {name=="" || nameErrorMsg !== "" ? <input  disabled
              placeholder="http://"
              id="link"
              name="link"
              type="url"
              onChange={(e)=>{formik.handleChange(e);addLinkOnDate(e);linkError(e);}}
              onBlur={(e=>linkError(e))}
              value={formik.values.link}
            /> : <input  
              placeholder="http://"
              id="link"
              name="link"
              type="url"
              onChange={(e)=>{formik.handleChange(e);addLinkOnDate(e);linkError(e);}}
              onBlur={(e=>linkError(e))}
              value={formik.values.link}
            /> }
            <div className="div-error-msg">{linkErrorMsg}</div>
          </div>        
          <label htmlFor="link"><FormattedMessage id="app.UploadVideoFromComputer"/></label>
          <div className="load-file-div">
            <div>
              <LoadGrey/>
            </div>
            <div><FormattedMessage id="app.UploadVideo"/></div>
            <div className="div-error-msg"></div>
            <div className="last-load-div">
              <span><FormattedMessage id="app.DragAndDrop"/></span> 
              <span><FormattedMessage id="app.or"/></span> 
              {(name=="" || nameErrorMsg!=="" || link!=="") ? <input disabled
                id="file"
                name="file"
                type="file"
                accept=".MP4, .AVI, .WMV, .MOV, .3GP, .FLV, .MPG, .MPEG-1, ."
                onChange={(e)=>{formik.handleChange(e);addFileOnDate(e);}}
                value={formik.values.file} 
              /> : <input 
                id="file"
                name="file"
                type="file"
                onChange={(e)=>{formik.handleChange(e);addFileOnDate(e);}}
                value={formik.values.file} 
              />}
               
              {(name=="" || nameErrorMsg!=="" || link!=="") ?  <label htmlFor="file" 
                className="button-disabled" id="file-label" >
                <TopArrow color="grey"/>
                <FormattedMessage id="app.SelectFile"/></label> :  <label htmlFor="file" 
                className="button-shape" id="file-label" >
                <TopArrow color="#455FCE"/>
                <FormattedMessage id="app.SelectFile"/></label>}
            </div>
          </div>       
        </div>
      </form>
    </div>
  );
};

export {Step1} ;

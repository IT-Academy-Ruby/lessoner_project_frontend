import { useFormik } from "formik";
import {  useState } from "react";

const formData1 = {
  name:"",link:"",file:"",disStatus1:"" 
};
let simbolsLeft:any = 0;

const Step1 = (  props:any  ) => {
  const [ name, setName ] = useState("");
  const [link, setLink] = useState("");
  const { onChange } = props;
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [linkErrorMsg, setLinkErrorMsg] = useState("");
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
  // ---------------------------------------------------------------------------------
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

  // ----------------------------------------------------------------------------

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
    } else { 
      setNameErrorMsg("");
      document.getElementById("name")?.classList.remove("error-border"); 
    }
  };
  
  const linkError = (event:React.FormEvent) => {
    formData1.file = ("");
    const e = event?.target as HTMLInputElement;
    setLink(e.value);
    formData1.link = e.value ;
    if( /^http:\/\//.test(e.value) === true || /^https:\/\//.test(e.value) === true )
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
            <label htmlFor="name">Name</label>
            <div className="name-div">
              <input 
                maxLength={64}
                placeholder="Lesson name"
                id="name"
                name="name"
                type="text"
                onChange={(e)=>{formik.handleChange(e);addNameOnDate(e);nameError(e);}}
                onBlur={(e)=>{nameError(e);}}
                value={formik.values.name}
              ></input>
              <div className="simbol-left">{simbolsLeft}/64</div>
            </div>
            <div className="div-error-msg">{nameErrorMsg}</div>
          </div>
          <div className="input-link">
            <label htmlFor="link">Link to the video</label>
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
          <label htmlFor="link">Upload video from computer</label>
          <div className="load-file-div">
            <div>
              <svg width="48" height="32" viewBox="0 0 48 32"
                fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.7 12.08C37.34 5.18 31.28 0 24 0C18.22 0 13.2 3.28
                 10.7 8.08C4.68 8.72 0 13.82 0 20C0 26.62 5.38 32 12 32H38C43.52
                  32 48 27.52 48 22C48 16.72 43.9 12.44 38.7 12.08ZM28
                   18V26H20V18H14L23.3 8.7C23.7 8.3 24.32 8.3 24.72 8.7L34 18H28Z" fill="#9A9AA3"/>
              </svg>
            </div>
            <div>Upload video</div>
            <div className="div-error-msg"></div>
            <div className="last-load-div">
              <span>Drag and drop</span> 
              <span>or</span> 
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
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66634 8.66648H6.33301C6.69967 8.66648 6.99967
                   8.36648 6.99967 7.99982V4.66648H8.05967C8.65301 4.66648 
                   8.95301 3.94648 8.53301 3.52648L5.47301 0.466484C5.21301
                    0.206484 4.79301 0.206484 4.53301 0.466484L1.47301 
                    3.52648C1.05301 3.94648 1.34634 4.66648 1.93967 
                    4.66648H2.99967V7.99982C2.99967 8.36648 3.29967 
                    8.66648 3.66634 8.66648ZM0.999674 9.99982H8.99967C9.36634 9.99982
                     9.66634 10.2998 9.66634 10.6665C9.66634 11.0332 9.36634 11.3332
                      8.99967 11.3332H0.999674C0.633008 11.3332 0.333008 11.0332 0.333008
                       10.6665C0.333008 10.2998 0.633008 9.99982 0.999674 9.99982Z" fill="#9A9AA3"/>
                </svg>Select file</label> :  <label htmlFor="file" 
                className="button-shape" id="file-label" >
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.66634 8.66648H6.33301C6.69967 8.66648 6.99967
                   8.36648 6.99967 7.99982V4.66648H8.05967C8.65301 4.66648 
                   8.95301 3.94648 8.53301 3.52648L5.47301 0.466484C5.21301
                    0.206484 4.79301 0.206484 4.53301 0.466484L1.47301 
                    3.52648C1.05301 3.94648 1.34634 4.66648 1.93967 
                    4.66648H2.99967V7.99982C2.99967 8.36648 3.29967 
                    8.66648 3.66634 8.66648ZM0.999674 9.99982H8.99967C9.36634 9.99982
                     9.66634 10.2998 9.66634 10.6665C9.66634 11.0332 9.36634 11.3332
                      8.99967 11.3332H0.999674C0.633008 11.3332 0.333008 11.0332 0.333008
                       10.6665C0.333008 10.2998 0.633008 9.99982 0.999674 9.99982Z" fill="#455FCE"/>
                </svg>Select file</label>}
            </div>
          </div>       
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export {Step1} ;

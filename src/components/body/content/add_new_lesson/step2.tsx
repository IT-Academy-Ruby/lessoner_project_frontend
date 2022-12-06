import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { ReactEventHandler , useState } from "react";
import { TopArrow } from "../../../svg/top-arrow";
import { useFormik } from "formik";


const formData2={category:"",description:""};
const Step2 = (props:any) => {
  const { onChange } = props;
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false); 

  const addCategoryOnDate=(event:React.FormEvent)=>{
    const e=event?.target as HTMLInputElement;
    formData2.category=e.value;
    onChange(formData2);
  };

  
  const addDescriptionOnDate=(event:React.FormEvent)=>{
    const e=event?.target as HTMLInputElement;
    formData2.description=e.value;
    onChange(formData2);
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
 
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-2">
          <div className="input-category">
            <label htmlFor="category">Category</label>
            <select id="category" 
              name="category"
              className="color-grey w100"   
              onChange={(e)=>{formik.handleChange(e);addCategoryOnDate(e);}}
              value={formik.values.category} >
              <option value="Choose a category" selected >
                  Choose a category
              </option>
              <option value="IT">IT</option>
              <option value="Music">Music</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div className="input-description">
            <label htmlFor="description">Description</label>
            <textarea
              required
              maxLength={600}
              aria-setsize={600}
              id="description"
              name="description"
              onChange={(e)=>{formik.handleChange(e);addDescriptionOnDate(e);}}
              value={formik.values.description}
            />
          </div>
          <div className="input-subtitles marg-bot-32">
            <label htmlFor="subtitles" className="subtitles">Subtitles</label>
            <span>Add subtitles to reach bigger audience</span>
            <div className="button-shape-2 active-step subtitle-div" onClick={onOpenModal}>
              <svg width="10" height="12" viewBox="0 0 10 12" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M3.66634 8.66648H6.33301C6.69967 8.66648 6.99967 8.36648
               6.99967 7.99982V4.66648H8.05967C8.65301 4.66648 8.95301 3.94648 8.53301
                3.52648L5.47301 0.466484C5.21301 0.206484 4.79301 0.206484 4.53301 0.466484L1.47301
                 3.52648C1.05301 3.94648 1.34634 4.66648 1.93967 4.66648H2.99967V7.99982C2.99967
                  8.36648 3.29967 8.66648 3.66634 8.66648ZM0.999674 9.99982H8.99967C9.36634 9.99982
                   9.66634 10.2998 9.66634 10.6665C9.66634 11.0332 9.36634 11.3332 8.99967
                    11.3332H0.999674C0.633008 11.3332 0.333008 11.0332 0.333008 10.6665C0.333008
                     10.2998 0.633008 9.99982 0.999674 9.99982Z" fill="white"/>
              </svg>
              Add subtitles
            </div>
            
            {/* <input
              id="subtitles"
              name="subtitles"
              type="button"
              onChange={formik.handleChange}
              value={"Add subtitles"}
              className="button-shape-2 active-step"
            /> */}
          </div>
        
          {/* <div>
            <button type="submit">Submit</button>
          </div> */}
          <div className="input-thumbnail marg-bot-32">
            <label className="subtitles">Thumbnail</label>
            <span>Select or upload a picture that shows whats in your video</span>
            <div className="all-div-thumbnail">
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={onCloseModal} center>
          <div className="input-category marg-bot-32 w100">
            <label htmlFor="category">Category</label>
            <select id="subtitles" 
              name="subtitles"
              className="color-grey w100"   
              onChange={(e)=>{formik.handleChange(e);addCategoryOnDate(e);}}
              value={formik.values.subtitles} >
              <option value="Subtitles language" selected >
              Subtitles language
              </option>
              <option value="English">English</option>
              <option value="Русский">Русский</option>
            </select>
          </div>
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
            <div className="error"></div>
            <div className="last-load-div">
              <span>Drag and drop</span> 
              <span>or</span> 
              <input 
                id="subtitlesFile"
                name="subtitlesFile"
                type="file"
                onChange={(e)=>{formik.handleChange(e);}}
                value={formik.values.subtitlesFile} 
                hidden
              />
              <label htmlFor="subtitlesFile" className="button-shape" id="file-label">
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
                </svg>Select file</label>
            </div>
          </div>
        </Modal>
      </form>
    </div>
  );
};

export default Step2;


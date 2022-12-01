import { useFormik } from "formik";
import { TopArrow } from "../../../svg/top-arrow";

const Step2 = () => {
  <div>
    
  </div>;
  const formik = useFormik({initialValues: {
    category: "",
    description:"",
    subtitles:""
  },
  onSubmit: values => {
    console.log(JSON.stringify(values, null, 2));
  },});
  const showSubtitles=()=>{
    console.log("hello");
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-2">
          <div className="input-category">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="color-grey"  
              onChange={formik.handleChange} value={formik.values.category} >
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
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
<<<<<<< HEAD
         
          <label htmlFor="subtitles">Subtitles</label>
          <span>Add subtitles to reach bigger audience</span>
          <input
            id="subtitles"
            name="subtitles"
            type="button"
            onChange={formik.handleChange}
            value={formik.values.subtitles}
          />
          {/* <div>
            <button type="submit">Submit</button>
          </div> */}
          <div>
            <span>Thumbnail</span>
=======
          <div className="input-subtitles marg-bot-32">
            <label htmlFor="subtitles" className="subtitles">Subtitles</label>
            <span>Add subtitles to reach bigger audience</span>
            <div className="button-shape-2 active-step subtitle-div" onClick={showSubtitles}>
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
>>>>>>> a71980f (some correct)
            <span>Select or upload a picture that shows whats in your video</span>
            <div className="all-div-thumbnail">
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
              <div className="div-thumbnail"></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Step2;

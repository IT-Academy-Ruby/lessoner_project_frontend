import { useFormik } from "formik";

const Step2 = () => {
  <div>
    
  </div>;
  const formik = useFormik({initialValues: {
    category: "",
    description:"",
    subtitles:""
  },
  onSubmit: values => {
    alert(JSON.stringify(values, null, 2));
  },});
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-2">
          <div className="input-category">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="color-grey"  
              onChange={formik.handleChange} value={formik.values.category} >
              <option value="Choose a category" disabled selected  >
        Choose a category
              </option>
              <option value="IT">IT</option>
              <option value="Music">Music</option>
              <option value="Design">Design</option>
            </select>
          </div>
          <div className="input-description">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </div>
         
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
        </div>
      </form>
    
    </div>
  );
};
export default Step2;

import { useFormik } from "formik";

const Step1 = () => {
  const change=(event:any)=>{
    const val=event?.target.value;
    console.log(val);
  };
  const formik = useFormik({initialValues: {
    name: "",
    link: "",
    file: "",
  },
  onSubmit: (values) => {
    alert(JSON.stringify(values, null, 2));
  },});
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-1">
          <div className="input-name">
            <label htmlFor="name">Name</label>
            <input onBlur={change}
              placeholder="Lesson name"
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>
          <div className="input-link">
            <label htmlFor="link">Link to the video</label>
            <input
              placeholder="http://"
              id="link"
              name="link"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.link}
            />
          </div>
         
          <label htmlFor="link">Upload video from computer</label>
          <input
            id="file"
            name="fole"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.file}
          />
          <div>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>
    
    </div>
    
  );
};
export default Step1;

import { useFormik } from "formik";
import { ReactElement } from "react";
import { isConditionalExpression } from "typescript";

const Step1 = () => {
  // const change=(event:React.FormEvent)=>{
  //   const val=event?.target as HTMLInputElement;
  //   console.log(val.value);
  // };
  const formik = useFormik({initialValues: {
    name: "",
    link: "",
    file: "",
  },
  onSubmit: (values) => {
    console.log(JSON.stringify(values, null, 2));
  },});
  const symbolCalc=(event:ReactElement)=>{
    const e=event.target as HTMLInputElement
    console.log(e.value)
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="formik-form-step-1">
        <div className="form-step-1">
          <div className="input-name">
            <label htmlFor="name">Name</label>
            <div>
              <input 
                maxLength={64}
                placeholder="Lesson name"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange, symbolCalc}
                value={formik.values.name}
              ></input>
              <div>/64</div>
            </div>
            
          </div>
          <div className="input-link">
            <label htmlFor="link">Link to the video</label>
            <input
              placeholder="http://"
              id="link"
              name="link"
              type="url"
              onChange={formik.handleChange}
              value={formik.values.link}
            />
          </div>
         
          <label htmlFor="link">Upload video from computer</label>
          <input
            id="file"
            name="file"
            type="file"
            onChange={formik.handleChange}
            value={formik.values.file}
          />
          {/* <div>
            <button type="submit">Submit</button>
          </div> */}
        </div>
      </form>
    </div>
  );
};
export default Step1;

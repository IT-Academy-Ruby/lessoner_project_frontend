import { BrowserRouter } from "react-router-dom";
import MyStudioContent from "./MyStudioContent";
import  MyStudioHead  from "./MyStudioHead";
import AllLessons from "../AllLessons/AllLessons";
import { Route } from "react-router-dom";

const MyStudio=()=>{
  return (<>
    <MyStudioHead/>
    <MyStudioContent/>

  </>
  );
};
export default MyStudio;
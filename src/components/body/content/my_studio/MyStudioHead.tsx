import "./my_studio_head.css";
import { FormattedMessage } from "react-intl";
import { PlusSvg } from "../../../svg/PlusSvg";
import { useState } from "react"; 

const MyStudioHead = () => {
  const [statusActive, setStatusActive] = useState("All lessons");
  const [categoryActive, setCategoryActive] = useState("All categories");

  const handleStatusToggle = (status: string) => {
    setStatusActive(status);
  };

  const handleCategoryToggle = (event:React.ChangeEvent) => {
    const category = event.target as HTMLInputElement;
    setCategoryActive(category.value);
  };

  const STATUSES = ["All lessons", "Published", "In review", "Draft", "Archived"];
  const CATEGORIES = ["All categories", "IT", "Music", "Design"];
  const elementsStatus = STATUSES.map((status) => {
    return (
      <div key={status}  id="status-div">
        <span  onClick={() => handleStatusToggle(status)}  
          className="status_lesson">{status}
          {status===statusActive ? <div className="status-div"></div> : null}
        </span>
        
      </div>
    );
  });
  const elementsCategory = CATEGORIES.map((category) => {
    return (     
      <option key={category} id={category}
      >{category}
      </option>
    );
  });
  console.log(categoryActive, statusActive);
  return (
    <div className="my-studio-head">
      <div className="my-lesson-head">
        <div>
          <span id="div-my-lessons"><FormattedMessage id="app.My lessons" />
          </span>
        </div> 
        <div>
          <button id="intro"><PlusSvg/><FormattedMessage id="app.Add new lesson" />
          </button>
        </div> 
      </div>
      <div className="lessons-nav">
        <div className="my-lessons" >
          {elementsStatus} 
        </div>
        <div className="my-categories">
          <select name="" id="my_studio_select" onChange={(event)=>handleCategoryToggle(event)}>
            {elementsCategory}
          </select>
        </div>
      </div>  
    </div>     
  );
};

export default MyStudioHead;

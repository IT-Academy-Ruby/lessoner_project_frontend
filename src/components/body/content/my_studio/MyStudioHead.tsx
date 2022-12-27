import "./my_studio_head.css";

import { FormattedMessage } from "react-intl";
import { PlusSvg } from "../../../svg/PlusSvg";

import { Link } from "react-router-dom";

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
  
  return (
    <div className="my-studio-head">
      <div className="my-lesson-head">
        <div>
          <span id="div-my-lessons"><FormattedMessage id="app.My lessons" />
          </span>
        </div> 
        <div className="add-new-lesson-div">
          <Link to="/myStudio/add_new_lesson">
            <button id="intro"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12.7142 7.95239H7.9523V12.7143C7.9523 13.2381 7.52373 13.6667 6.99992
          13.6667C6.47611 13.6667 6.04754 13.2381 6.04754 12.7143V7.95239H1.28563C0.761823 
          7.95239 0.333252 7.52382 0.333252 7.00001C0.333252 6.4762 0.761823 6.04763 1.28563
          6.04763H6.04754V1.28572C6.04754 0.761915 6.47611 0.333344 6.99992 0.333344C7.52373 
          0.333344 7.9523 0.761915 7.9523 1.28572V6.04763H12.7142C13.238 6.04763 13.6666 6.4762
          13.6666 7.00001C13.6666 7.52382 13.238 7.95239 12.7142 7.95239Z" fill="white"/>
            </svg>Add new lesson
            </button>
          </Link>
        </div> 
      </div>
      <div className="lessons-nav">
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
    </div>   
  );
};

export default MyStudioHead;

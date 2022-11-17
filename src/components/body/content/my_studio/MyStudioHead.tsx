import "./my_studio_head.css";
import {FormattedMessage} from "react-intl";
import { useState } from "react"; 


const MyStudioHead=()=>{
  // const data=[{
  //   "id": 1,
  //   "title": "1string",
  //   "description": "1string",
  //   "video_link": "1string",
  //   "status": "archived",
  //   "author_id": 1,
  //   "category_id": "1"
  // },{
  //   "id": 2,
  //   "title": "2string",
  //   "description": "2string",
  //   "video_link": "2string",
  //   "status": "draft",
  //   "author_id": 2,
  //   "category_id": "2"
  // },{
  //   "id": 3,
  //   "title": "3string",
  //   "description": "3string",
  //   "video_link": "3string",
  //   "status": "in review",
  //   "author_id": 3,
  //   "category_id": "3"
  // }];
  const [statusActive,setStatusActive]=useState("all lessons");
  const [categoryActive,setCategoryActive]=useState("all categories");

  const statusElements=(event:any)=>{
    setStatusActive(event.target.classList.value);
    console.log(event.target.classList.value);
    // document.getElementById("status-div")?.classList.add("status-active");
  };

  const statusCategory=( event:any )=>{
    setCategoryActive(event.target.classList.value); 
    console.log(event.target.classList.value);
  };

  const status=[ "all lessons", "published", "in review", "draft", "archived" ];
  const category=[ "All categories", "IT", "Music", "Design" ];
  const elementsStatus=status.map((elem)=>{
    return (
      <div key={elem}  id="status-div" >
        <span  onClick={ statusElements }  className={ elem+" status_lesson" } >{ elem }</span>
        <span className="status-div"></span>
        
      </div>
    );
  });
  const elementsCategory=category.map((elem)=>{
    return(     
      <option key={elem} className={elem} onClick={ statusCategory }>{ elem }</option>
    );
  });
  console.log(statusActive,categoryActive);
  // const cardsArr= useMemo(()=>{
  //   const arr=data.filter(item=>{
  //     item.status===statusActive && item.category_id===categoryActive});
  //     return {arr}
  // },[statusActive,categoryActive]);
  // console.log(cardsArr);
  
  return(<div className="my-studio-head">
    <div className="my-lesson-head">
      <div><span id="div-my-lessons"><FormattedMessage id="app.My lessons" /></span></div> 
      <div><button id="intro"><svg width="14" height="14" viewBox="0 0 14 14" fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M12.7142 7.95239H7.9523V12.7143C7.9523 13.2381 7.52373 13.6667 6.99992
          13.6667C6.47611 13.6667 6.04754 13.2381 6.04754 12.7143V7.95239H1.28563C0.761823 
          7.95239 0.333252 7.52382 0.333252 7.00001C0.333252 6.4762 0.761823 6.04763 1.28563
          6.04763H6.04754V1.28572C6.04754 0.761915 6.47611 0.333344 6.99992 0.333344C7.52373 
          0.333344 7.9523 0.761915 7.9523 1.28572V6.04763H12.7142C13.238 6.04763 13.6666 6.4762
          13.6666 7.00001C13.6666 7.52382 13.238 7.95239 12.7142 7.95239Z" fill="white"/>
      </svg><FormattedMessage id="app.Add new lesson" /></button></div> 
    </div>
    <div className="lessons-nav">
      <div className="my-lessons" >
        {elementsStatus} 
      </div>
      <div className="my-categories">
        <div className="div-sorting-methods">
          <div>
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none" 
              xmlns="http://www.w3.org/2000/svg">
              <path d="M1 6H4C4.55 6 5 5.55 5 5V1C5 0.45 4.55 0 4 0H1C0.45 0 0 0.45 0 1V5C0
                5.55 0.45 6 1 6ZM1 13H4C4.55 13 5 12.55 5 12V8C5 7.45 4.55 7 4 7H1C0.45 7 0 7.45
                0 8V12C0 12.55 0.45 13 1 13ZM7 13H10C10.55 13 11 12.55 11 12V8C11 7.45 10.55 7
                10 7H7C6.45 7 6 7.45 6 8V12C6 12.55 6.45 13 7 13ZM13 13H16C16.55 13 17 12.55 
                17 12V8C17 7.45 16.55 7 16 7H13C12.45 7 12 7.45 12 8V12C12 12.55 12.45 13 13 
                13ZM7 6H10C10.55 6 11 5.55 11 5V1C11 0.45 10.55 0 10 0H7C6.45 0 6 0.45 6 1V5C6
                5.55 6.45 6 7 6ZM12 1V5C12 5.55 12.45 6 13 6H16C16.55 6 17 5.55 17 5V1C17 0.45 16.55
                0 16 0H13C12.45 0 12 0.45 12 1Z" fill="#455FCE"/>
            </svg>
          </div>
          <div>
            <svg width="18" height="10" viewBox="0 0 18 10" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 2H5C4.45 2 4 1.55 4 1C4 0.45 4.45 0 5 0H17C17.55 0 18 0.45 18 1C18 1.55
                17.55 2 17 2ZM17 6H5C4.45 6 4 5.55 4 5C4 4.45 4.45 4 5 4H17C17.55 4 18 4.45 18 5C18
                5.55 17.55 6 17 6ZM17 10H5C4.45 10 4 9.55 4 9C4 8.45 4.45 8 5 8H17C17.55 8 18 8.45
                18 9C18 9.55 17.55 10 17 10ZM2 9C2 9.55229 1.55228 10 1 10C0.447716 10 0 9.55229
                0 9C0 8.44771 0.447716 8 1 8C1.55228 8 2 8.44771 2 9ZM1 0C1.55228 0 2 0.447715 2
                1C2 1.55228 1.55228 2 1 2C0.447716 2 0 1.55228 0 1C0 0.447715 0.447716 0 1 0ZM2
                5C2 5.55228 1.55228 6 1 6C0.447716 6 0 5.55228 0 5C0 4.44772 0.447716 4 1 
                4C1.55228 4 2 4.44772 2 5Z" fill="#5A5D72"/>
            </svg>
          </div>
          
        </div>
        <select name="" id="my_studio_select">
          {elementsCategory}
        </select>
      </div>
    </div>  
    
  </div>     
  );
};
export default MyStudioHead;
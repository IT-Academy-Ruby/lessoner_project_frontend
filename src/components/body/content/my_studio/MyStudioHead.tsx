import { useMemo, useState } from "react";
import "./my_studio_head.css"; 

const MyStudioHead=()=>{
  const data=[{
    "id": 1,
    "title": "1string",
    "description": "1string",
    "video_link": "1string",
    "status": "archived",
    "author_id": 1,
    "category_id": "1"
  },{
    "id": 2,
    "title": "2string",
    "description": "2string",
    "video_link": "2string",
    "status": "draft",
    "author_id": 2,
    "category_id": "2"
  },{
    "id": 3,
    "title": "3string",
    "description": "3string",
    "video_link": "3string",
    "status": "in review",
    "author_id": 3,
    "category_id": "3"
  }];
  const [statusActive,setStatusActive]=useState("all lessons");
  const [categoryActive,setCategoryActive]=useState("all categories");
  const statusElements=(event:any)=>{
    setStatusActive(event.target.classList.value);
  };

  const statusCategory=(event:any)=>{
    setCategoryActive(event.target.classList.value); 
  };

  const status=[ "all lessons", "published", "in review", "draft", "archived" ];
  const category=[ "all categories", "it", "music", "design" ];
  const elementsStatus=status.map((elem)=>{
    return (
      <button key={elem} >
        <div className={elem} onClick={statusElements}>{elem}</div>
        <div className={elem+"-animation"}></div>
      </button>
    );
  });
  const elementsCategory=category.map((elem)=>{
    return(
      <button key={elem}>
        <div className={elem} onClick={statusCategory}>{elem}</div>
      </button>
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
    <h2 id="intro">My Lessons</h2>
    <div className="my-lessons" >
      {elementsStatus} 
    </div>
    <div className="my-categories">
      {elementsCategory}
    </div>

  </div>     
  );
};
export default MyStudioHead;
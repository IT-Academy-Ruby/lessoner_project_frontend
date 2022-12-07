import "./index.scss";
import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import LessonCard from "../../../LessonCard";
import items from "../../../../assets/LessonCard.json";
import requestApi from "../../../../services/request";

const categoriesUrl = "https://Lessoner-project-2w3h.onrender.com/categories";
const lessonsUrl = "https://lessoner-project-2w3h.onrender.com/lessons";

const Lessons: React.FC = () => {
  interface Lesson {
    id: number;
    title: string;
    description: string;
    duration?: string;
    video_link: string;
    status: string;
    author_id: number;
    category_id: string;
    created_at: string;
    imagePreview?: string;
    view?: number;
    rating?: number;
    totalVotes?: number;
  }
  interface Category {
    id: number;
    name: string;
    description: string;
    status: string;
  }

  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    const fetchSuccess = (data: Category[]) => {
      setCategories(data);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };
    const fetchData = async () => {
      const response = await requestApi(categoriesUrl, "GET");
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
  }, []);
  console.log(categories);

  const [data, setData] = useState<Lesson[]>([]);
  useEffect(() => {
    const fetchSuccess = (data: Lesson[]) => {
      setData(data);
    };
    const fetchError = (errMessage: string) => {
      alert(errMessage);
    };
    const fetchData = async () => {
      const response = await requestApi(lessonsUrl, "GET");
      if (!response.ok) {
        fetchError("fetch error " + response.status);
      } else {
        const data = await response.json();
        fetchSuccess(data);
      }
    };
    fetchData();
  }, []);
  console.log(data);

  //  сделать Helper, который делает дополнительный fetch-запрос и  получает массив всех категорий ( url/categories) и делаю поиск по массиву, чтобы category_id
  // соответстовал айдишнику категории урока
  // во внутруннем стейте храним категории
  //
  //
  // Те свойства, которые есть на бэке: id , title, categoryId, status  11 нужно
  //   render(){
  //     if ( !this.state.dataReady )
  //     return <div>загрузка данных...</div>;
  //     return  (
  // <Fragment>
  // <BrowserRouter>
  //  <PagesLinks />
  //  <PagesRouter dataReady={this.state.dataReady} data={this.state.data} startData={this.state.startData} dough={this.state.dough}
  //  sortArr={this.state.sortArr} dataPage1={this.state.dataPage1} dataPage2={this.state.dataPage2} dataPage3={this.state.dataPage3} pagesArr={this.state.PagesArr}/>
  // </BrowserRouter>
  // </Fragment>
  // )
  //   }
  if (!data) return <div>загрузка данных...</div>;
  return (
    <div className="wrapper__Lessons">
      {/* <FormattedMessage id="app.Lessons" /> */}
      <div className="Lessons">
        {data.map((obj) => (
          <LessonCard
            key={obj.id}
            title={obj.title}
            status={obj.status}
            duration={obj.duration}
            imagePreview={obj.imagePreview}
            id={obj.id}
            published={obj.created_at}
            view={obj.view}
            category={obj.category_id}
            rating={obj.rating}
            totalVotes={obj.totalVotes}
          />
        ))}
      </div>
    </div>
  );
};

export default Lessons;

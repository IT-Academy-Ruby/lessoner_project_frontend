import "./categories.scss";
import Button from "../../../Button";
import {FormattedMessage, useIntl} from "react-intl";
import Delete from "../../../icons/delete.svg";
import Edit from "../../../icons/edit.svg";
import IT from "../../../icons/examplImage/IT.svg";
import Music from "../../../icons/examplImage/music.svg";
import Disign from "../../../icons/examplImage/disign.svg";
import {useNavigate} from "react-router-dom";

const Categories = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const nameColomn = [
    "ID",
    intl.formatMessage({id: "app.categories.image"}),
    intl.formatMessage({id: "app.categories.category"}),
    intl.formatMessage({id: "app.categories.description"}),
    intl.formatMessage({id: "app.categories.date"}),
    intl.formatMessage({id: "app.categories.amount"}),
    intl.formatMessage({id: "app.categories.actions"}),
  ];
  const rowArray = [
    {
    id:"1",
    image:IT,
    category:"IT",
    description:"Videos and trainings on all aspects of informational technologies. More than 1000 videos on popular IT specialties: programming languages, software testing, business analysis, etc. More than 20 online courses on popular IT specialties: programming languages, software testing, business analysis, etc.",
    amount:1020,
  },
    {
      id:"2",
      image:Music,
      category:"Music",
      description:"Videos and trainings on all aspects of music: harmony, theory, improvisation, arrangement, composition, melody creation, song creation, guitar. The opportunity to try yourself in different genres and directions. Learn from scratch and improve your skills with the best professionals in the music industry\n",
      amount:650,
    },
    {
      id:"3",
      image:Disign,
      category:"Disign",
      description:"Design education: 30+ professions and 1000+ courses in graphic, web design, UX and UI, product and industrial design. Current approaches to learning. Opportunity to study disciplines from scratch and improve your skills\n",
      amount:110,
    }
  ];
const addCategory = ()=>{
  navigate("/categories/addCategory")
}

  return (
    <div className="categories">
      <div className="category-header">
        <h1 className="category-title">
          <FormattedMessage id="app.categories"/>
        </h1>
        <Button
          className="button-login"
          buttonText={intl.formatMessage({id: "app.button.categories"})}
          buttonType="button"
          onClick={addCategory}
        />
      </div>
      <div className="tab">
        <div className="row-category">
          {nameColomn.map(column => <div key={column} className="column-name">{column}</div>)}
        </div>
        {rowArray.map(category=>
          <button key={category.id} className="row-category tab-category">
            <div className="category-text">{category.id}</div>
            <img src={category.image} alt={category.category} className="category-img"/>
            <div className="category-name">{category.category}</div>
            <div className="category-text category-description">{category.description}</div>
            <div className="category-date">{new Date().toLocaleDateString()}</div>
            <div className="category-text">{category.amount}</div>
            <div className="category-icon">
              <img src={Edit} alt="edit" className="icon-edit"/>
              <img src={Delete} alt="delete" className="icon-delete"/>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};
export default Categories;

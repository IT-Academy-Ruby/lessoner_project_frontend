import "./index.scss";
import { FormattedMessage, useIntl } from "react-intl";
import CategoryBusiness from "../../../../assets/category_business.png";
import CategoryDesign  from "../../../../assets/category_design.png";
import CategoryIT  from "../../../../assets/category_it.png";
import CategoryMusic  from "../../../../assets/category_music.png";
import UserCategory from "../../../UserCategory";

// eslint-disable-next-line max-len
const TextIT = "The newest and most useful video tutorials on programming and high technologies will help you understand all the variety of information. Video lessons on specific technologies contribute to the development of the necessary skills. Explore the rabbit hole with experts in web development, programming and robotics";
// eslint-disable-next-line max-len
const TextDesign = "Design education: 30+ professions and 1000+ courses in graphic, web design, UX and UI, product and industrial design. Current approaches to learning. Opportunity to study disciplines from scratch and improve your skills";
// eslint-disable-next-line max-len
const TextMusic = "Videos and trainings on all aspects of music: harmony, theory, improvisation, arrangement, composition, melody creation, song creation, guitar. The opportunity to try yourself in different genres and directions. Learn from scratch and improve your skills with the best professionals in the music industry";
// eslint-disable-next-line max-len
const TextBusiness = "Discover a large collection of videos on the topic of business and entrepreneurship, that help you to learn the basics of financial literacy and help you organize your business processes. Thousands of experts share their knowledge of economics, management, business analysis, and how to organize your own business";

const Categories = () => {
  const intl = useIntl();
  return (
    <div className="wrapper__categories">
      <FormattedMessage id="app.categories" />
      <div className="categories__block">
        <UserCategory
          imagePreview={CategoryIT} 
          name={intl.formatMessage({id: "app.nameCategory.it"})} 
          text={TextIT} 
          bgColor="blue" />
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory
          imagePreview={CategoryMusic} 
          name={intl.formatMessage({id: "app.nameCategory.music"})} 
          text={TextMusic} 
          bgColor="grey"/>
        <UserCategory 
          imagePreview={CategoryBusiness} 
          name={intl.formatMessage({id: "app.nameCategory.business"})} 
          text={TextBusiness} 
          bgColor="orange"/>
        <UserCategory
          imagePreview={CategoryIT} 
          name={intl.formatMessage({id: "app.nameCategory.it"})} 
          text={TextIT} 
          bgColor="blue" />
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory
          imagePreview={CategoryMusic} 
          name={intl.formatMessage({id: "app.nameCategory.music"})} 
          text={TextMusic} 
          bgColor="grey"/>
        <UserCategory 
          imagePreview={CategoryBusiness} 
          name={intl.formatMessage({id: "app.nameCategory.business"})} 
          text={TextBusiness} 
          bgColor="orange"/>
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory 
          imagePreview={CategoryBusiness} 
          name={intl.formatMessage({id: "app.nameCategory.business"})} 
          text={TextBusiness} 
          bgColor="orange"/>
        <UserCategory
          imagePreview={CategoryIT} 
          name={intl.formatMessage({id: "app.nameCategory.it"})} 
          text={TextIT} 
          bgColor="blue" />
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory
          imagePreview={CategoryMusic} 
          name={intl.formatMessage({id: "app.nameCategory.music"})} 
          text={TextMusic} 
          bgColor="grey"/>
        <UserCategory 
          imagePreview={CategoryBusiness} 
          name={intl.formatMessage({id: "app.nameCategory.business"})} 
          text={TextBusiness} 
          bgColor="orange"/>
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory
          imagePreview={CategoryIT} 
          name={intl.formatMessage({id: "app.nameCategory.it"})} 
          text={TextIT} 
          bgColor="blue" />
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory
          imagePreview={CategoryMusic} 
          name={intl.formatMessage({id: "app.nameCategory.music"})} 
          text={TextMusic} 
          bgColor="grey"/>
        <UserCategory 
          imagePreview={CategoryBusiness} 
          name={intl.formatMessage({id: "app.nameCategory.business"})} 
          text={TextBusiness} 
          bgColor="orange"/>
        <UserCategory 
          imagePreview={CategoryDesign} 
          name={intl.formatMessage({id: "app.nameCategory.design"})} 
          text={TextDesign} 
          bgColor="pink"/>
        <UserCategory
          imagePreview={CategoryIT} 
          name={intl.formatMessage({id: "app.nameCategory.it"})} 
          text={TextIT} 
          bgColor="blue" />
      </div>
    </div>
  );
};
export default Categories;

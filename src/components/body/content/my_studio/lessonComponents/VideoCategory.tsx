import "./select.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {useEffect, useState} from "react";
import ArrowDown from "../../../../icons/arrowDown.svg";
import ArrowUp from "../../../../icons/arrowUp.svg";
import Select from "react-select";
import {getCategory} from "../../../../../store/categorySlice/categorySlice";


type VideoCategoryProps = {
  setVideoCategory: (object: { value: string, label: string }) => void;
  videoCategory: { value: string, label: string };
  lesson: { category_id: number };
  add: boolean;
  error?: string;
}

const VideoCategory = ({
  setVideoCategory, videoCategory, error, lesson, add
}: VideoCategoryProps) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const allCategories = useAppSelector((state) => state.categories.categories);
  const [options, setOptions] = useState<{ value: string, label: string }[]>();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    if (allCategories.length > 1) {
      setOptions(allCategories.map(
        category => ({value: category.id.toString(), label: category.name}))
      );
    }
  }, [allCategories]);

  useEffect(() => {
    if (options && !videoCategory.value && lesson.category_id) {
      setVideoCategory(options.filter(category => category.value ===
        lesson.category_id.toString())[0]);
    }
  }, [options, lesson.category_id, setVideoCategory, videoCategory.value]);

  const handleChange = (selected: { value: string, label: string } | null) => {
    if (selected !== null) {
      setVideoCategory({value: selected.value, label: selected.label});
    }
  };

  return (
    <label className="category-label">
      <FormattedMessage id="app.categories.category"/>
      {(add || videoCategory.label) &&
        <>
          <img src={isChecked?ArrowUp:ArrowDown} alt="arrow" className="arrow-category"/>
          < Select
            placeholder={intl.formatMessage({id: "app.ChooseACategory"})}
            onChange={handleChange}
            options={options}
            defaultValue={videoCategory}
            className="select"
            classNamePrefix="react-select"
            onMenuOpen={()=>{setIsChecked(true);}}
            onMenuClose={()=>{setIsChecked(false);}}
          />
        </>}

      {error && <span className="message error">{error}</span>}
    </label>
  );
};

export default VideoCategory;
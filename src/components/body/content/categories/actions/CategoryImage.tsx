import "./categoryImage.scss";
import {FormattedMessage} from "react-intl";
import Select from "../../../../icons/select.svg";
import Upload from "../../../../icons/download.svg";
import {useRef} from "react";

type CategoryImageProps = {
  field: {
    name: string;
    onClick: () => void,
    value: string | undefined;
  },
  error?: string | undefined;
}

const CategoryImage = ({error}: CategoryImageProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
    ;
  };
  return (
    <div className="category-label">
      <FormattedMessage id="app.categories.uploadCategoryImage"/>
      <div className="category-field"
      >
        <img src={Upload} alt="upload"/>
        <span className="upload-text category-upload">
          <FormattedMessage id="app.categories.uploadImage"/>
        </span>
        <div className="upload-buttons">
          <span className="upload-text">
            <FormattedMessage id="app.categories.dragAandDrop"/>
          </span>
          <span className="upload-text margin-or">
            <FormattedMessage id="app.categories.or"/>
          </span>
          <input
            ref={fileRef}
            type="file"
            className="category-file"
            accept="image/*"
          />
          <button className="button-select" onClick={handleUpload} type="button">
            <img src={Select} alt="Select file" className="button-image"/>
            <FormattedMessage id="app.categories.button.select"/>
          </button>
        </div>
        {error && <span className="error-message">{error}</span>}
      </div>
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
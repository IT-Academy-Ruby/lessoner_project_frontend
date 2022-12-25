import "./categoryImage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import Change from "../../../../icons/Change.svg";
import Delete from "../../../../icons/DeleteButton.svg";
import Select from "../../../../icons/select.svg";
import Upload from "../../../../icons/download.svg";
import {useRef} from "react";
import {useState} from "react";

type CategoryImageProps = {
  field: {
    name: string;
    onClick: () => void,
    value: FileList | null;
  },
  error?: string | undefined;
  selectImage: File | undefined;
  setSelectImage: (image: File | null) => void;
}

const CategoryImage = ({error, selectImage, setSelectImage, field}: CategoryImageProps) => {
  const intl = useIntl();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {

    setSelectImage(event.target.files ? event.target.files[0] : null);
    if (event.target.files) {
      if (event.target.files[0]["size"] > 5242880) {
        setIsLargeFile(true);
      } else {
        setIsLargeFile(false);
      }
    }
  }

  const handleChangeFile = () => {
    setIsChange(true);
  };

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="category-label">

      <FormattedMessage id="app.categories.uploadCategoryImage"/>
      {!selectImage && <>
      <span className="category-image-inform">
       <FormattedMessage id="app.categories.imageInform"/>
      </span>
        <input
          ref={fileRef}
          type="file"
          className="category-file"
          accept=".jpg, .gif, .png"
          onChange={(event) => {
            handleSelectFile(event)
          }}
        />
        <button
          className="button-login"
          onClick={() => handleUpload()}
          type="button"
        >
          <img src={Select} alt="Select file" className="button-image"/>
          <FormattedMessage id="app.categories.button.select"/>
        </button>
      </>}
      {selectImage && <>
        <span className="upload-image">
           <FormattedMessage id="app.categories.uploadImage"/>
        </span>
        <div className="image-add-field">
          <img
            src={URL.createObjectURL(selectImage)}
            alt={selectImage.name}
            className="select-image"/>
          <div className="image-data">
            <span className="select-image-name">{selectImage.name}</span>
            <span className="select-image-size">{selectImage.size}</span>
          </div>
          <div className="category-buttons-field">
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.categories.change"})}
              className="button-select"
              buttonImage={Change}
              imageStyle="icon-button"
              onClick={handleChangeFile}
            />
            <Button
              buttonType="button"
              className="button-select button-delete"
              buttonText={intl.formatMessage({id: "app.categories.delete"})}
              buttonImage={Delete}
              imageStyle="icon-button"
              onClick={() => setSelectImage(null)}
            />
          </div>
        </div>
      </>
      }
      {error && <span className="error-message">{error}</span> ||
        isLargeFile && <span className="error-message">
        <FormattedMessage id="app.categories.imageBigSize"/>
      </span>}
      <hr className="category-image-line"/>
      {isChange && <div className="change-file-field" onClick={()=>setIsChange(false)}>

      </div>}
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
import "./categoryImage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import Button from "../../../../Button";
import Change from "../../../../icons/Change.svg";
import Delete from "../../../../icons/DeleteButton.svg";
import {IMAGE_DATA} from "../../../../../constants";
import Select from "../../../../icons/select.svg";
import Upload from "../../../../icons/download.svg";
import {useEffect, useRef, useState} from "react";

type CategoryImageProps = {
  field: {
    name: string;
    onClick: () => void,
    value: FileList | null;
  },
  error?: string | undefined;
  selectImage: { size: number, image: Blob | MediaSource, name: string, type: string };
  setSelectImage: (object: object) => void;
  setEditCategory: (object: string) => void;
  editCategory: string;
}

const CategoryImage = ({
                         error, selectImage, setSelectImage, field, setEditCategory, editCategory
                       }: CategoryImageProps) => {
  const intl = useIntl();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectImage({
        image: event.target.files[0],
        size: event.target.files[0]["size"],
        name: event.target.files[0]["name"],
        type: event.target.files[0]["type"]
      });
      if (selectImage!.size > IMAGE_DATA.size) {
        setIsLargeFile(true);
      } else {
        setIsLargeFile(false);
      }
    }
  }
  useEffect(() => {
    // setSelectImage(selectImage)
  }, [selectImage])

  const handleChangeFile = () => {
    setIsChange(true);
  };

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  const handleDelete = () => {
    setSelectImage({name: null});
    setEditCategory("");
  }

  return (
    <div className="category-label">
      <FormattedMessage id="app.categories.uploadCategoryImage"/>
      {!selectImage.name && !editCategory && <>
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
      {(!!selectImage.name || !!editCategory) && <>
        <span className="upload-image">
           <FormattedMessage id="app.categories.uploadImage"/>
        </span>
        <div className="image-add-field">
          <img
            src={selectImage.name ? URL.createObjectURL(selectImage.image) : editCategory}
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
              onClick={handleDelete}
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
      {isChange && <div className="change-file-field" onClick={() => setIsChange(false)}>

      </div>}
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
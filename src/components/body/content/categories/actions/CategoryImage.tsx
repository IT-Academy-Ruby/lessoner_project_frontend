import "./categoryImage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  useEffect, useRef, useState
} from "react";
import Button from "../../../../Button";
import Change from "../../../../icons/change.svg";
import Select from "../../../../icons/select.svg";

type CategoryImageProps = {
  selectImage: {
    size: number;
    image: Blob;
    name: string;
    type: string;
  };
  setSelectImage: (object: object) => void;
  setEditCategory: (object: object) => void;
  editCategory: { image: string, name: string, type: string, size: number };
  errorImage: string;
  setErrorImage: (error: string) => void;
  isCategory: boolean;
  title: string;
  inform: string;
  textButton: string;
  imageData: { format: [], size: number };
};

const CategoryImage = ({
  selectImage, setSelectImage, setEditCategory, editCategory, errorImage,
  setErrorImage, isCategory, title, inform, textButton, imageData
}: CategoryImageProps) => {
  const intl = useIntl();
  const fileRef = useRef<HTMLInputElement>(null);

  const [isChange, setIsChange] = useState(false);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setEditCategory({image: null});
      setSelectImage({
        image: event.target["files"][0],
        size: event.target["files"][0]["size"],
        name: event.target["files"][0]["name"],
        type: event.target["files"][0]["type"],
      });
    }
  };

  useEffect(() => {
    if (selectImage.type) {
      const isFormat = imageData.format.some(format => format ===
        "." + selectImage.type.slice(selectImage.type.indexOf("/") + 1));
      if (selectImage.size > imageData.size) {
        setErrorImage(intl.formatMessage({id: "app.categories.imageBigSize"}));
      } else if (!isFormat) {
        setErrorImage(intl.formatMessage({id: "app.categories.imageError"}));
      } else if (!selectImage.name && isChange) {
        setErrorImage(intl.formatMessage({id: "app.categories.selectFile"}));
      } else {
        setErrorImage("");
      }
    }
  }, [imageData.format, imageData.size, selectImage, intl, isChange, setErrorImage]);

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="category-label">
      {title}
      <span className="category-image-inform">
        {inform}
      </span>
      <input
        ref={fileRef}
        type="file"
        className="category-file"
        accept=".jpg, .gif, .png"
        onChange={(event) => {
          handleSelectFile(event);
        }}
        onBlur={() => setIsChange(true)}
      />
      {!selectImage.name && !editCategory.image && <>

        <Button
          buttonType="button"
          className="button-login-category"
          onClick={handleUpload}
          buttonImage={Select}
          imageStyle="button-image"
          buttonText={textButton}
        />
      </>}
      {(!!selectImage.name || !!editCategory.image) && <>
        <span className="category-image-uploading">
          <FormattedMessage id="app.categories.uploadedFileCategoryImage"/>
        </span>
        <div className="image-category-field">
          <div className="image-category">
            <img
              src={selectImage.image
                ? URL.createObjectURL(selectImage.image) : editCategory.image}
              alt={selectImage.name || editCategory.name}
              className="select-image"/>
            <div className="image-data">
              <span className="select-image-name">
                {selectImage.name || editCategory.name}
              </span>
              <span className="select-image-size">
                {Math.floor((selectImage.size || editCategory.size) / 1048.576) / 1000} MB
              </span>
            </div>
          </div>
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.categories.change"})}
            className="button-select"
            buttonImage={Change}
            imageStyle="icon-button"
            onClick={handleUpload}
          />
        </div>
      </>
      }
      {errorImage && <span className="error message">
        {errorImage}
      </span>}
      {isCategory && <hr className="category-image-line"/>}
    </div>
  );
};

CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
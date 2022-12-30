import "./categoryImage.scss";
import {FormattedMessage, useIntl} from "react-intl";
import {
  useEffect, useRef, useState
} from "react";
import Button from "../../../../Button";
import Change from "../../../../icons/Change.svg";
import {IMAGE_DATA} from "../../../../../constants";
import Select from "../../../../icons/select.svg";

type CategoryImageProps = {
  field: {
    name: string;
    onClick: () => void;
    value: FileList;
  },
  selectImage: {
    size: number;
    image: FileList;
    name: string;
    type: string;
  };
  setSelectImage: (object: object) => void;
  setEditCategory: (object: object) => void;
  editCategory: { image: string, name: string, type: string, size: number };
};

const CategoryImage = ({
  selectImage, setSelectImage, setEditCategory, editCategory
}: CategoryImageProps) => {
  const intl = useIntl();
  const fileRef = useRef<HTMLInputElement>(null);
  const [errorImage, setErrorImage] = useState("");
  const [isChange, setIsChange] = useState(false);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setEditCategory({image: null});
      setSelectImage({
        image: event.target['files'][0],
        size: event.target['files'][0]["size"],
        name: event.target['files'][0]["name"],
        type: event.target['files'][0]["type"],
      });
    }
  };

  useEffect(() => {
    if (selectImage.type) {
      const isFormat = IMAGE_DATA.format.some(format => format ===
        "." + selectImage.type.slice(selectImage.type.indexOf("/") + 1));
      if (selectImage.size > IMAGE_DATA.size) {
        setErrorImage(intl.formatMessage({id: "app.categories.imageBigSize"}));
      } else if (!isFormat) {
        setErrorImage(intl.formatMessage({id: "app.categories.imageError"}));
      } else if (!selectImage.name && isChange) {
        setErrorImage(intl.formatMessage({id: "app.categories.selectFile"}));
      } else {
        setErrorImage("");
      }
    }
  }, [selectImage,intl,isChange]);

  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="category-label">
      <FormattedMessage id="app.categories.uploadCategoryImage"/>
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
        <span className="category-image-inform">
          <FormattedMessage id="app.categories.imageInform"/>
        </span>
        <button
          className="button-login"
          onClick={handleUpload}
          type="button"
        >
          <img src={Select} alt="Select file" className="button-image"/>
          <FormattedMessage id="app.categories.button.select"/>
        </button>
      </>}
      {(!!selectImage.name || !!editCategory.image) && <>
        <span className="upload-image">
          <FormattedMessage id="app.categories.uploadImage"/>
        </span>
        <div className="image-add-field">
          <img
            src={!editCategory.image
              ? URL.createObjectURL(selectImage.image[0]) : editCategory.image}
            alt={selectImage.name || editCategory.name}
            className="select-image"/>
          <div className="image-data">
            <span className="select-image-name">
              {selectImage.name || editCategory.name}
            </span>
            <span className="select-image-size">
              {Math.floor((selectImage.size || editCategory.size)/1048.576)*0.001} MB
            </span>
          </div>
          <div className="category-buttons-field">
            <Button
              buttonType="button"
              buttonText={intl.formatMessage({id: "app.categories.change"})}
              className="button-select"
              buttonImage={Change}
              imageStyle="icon-button"
              onClick={handleUpload}
            />
          </div>
        </div>
      </>
      }
      {errorImage && <span className="error message">
        {errorImage}
      </span>}
      <hr className="category-image-line"/>
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
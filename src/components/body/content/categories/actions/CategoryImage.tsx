import "./categoryImage.scss";
import {FormattedMessage} from "react-intl";
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
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLargeFile, setIsLargeFile] = useState(false);

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {

    setSelectImage(event.target.files ? event.target.files[0] : null)

    if (event.target.files) {
      if (event.target.files[0]["size"] > 5242880) {
        setIsLargeFile(true);
      }else {setIsLargeFile(false)}
    }
  }
  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  };

  return (
    <div className="category-label">
      <FormattedMessage id="app.categories.uploadCategoryImage"/>
      <span className="category-image-inform">
       <FormattedMessage id="app.categories.imageInform"/>
      </span>
      <input
        ref={fileRef}
        type="file"
        className="category-file"
        accept=".jpg, .gif, .png"
        onChange={(event) => {
          handleChangeFile(event)
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
      {error && <span className="error-message">{error}</span> ||
        isLargeFile && <span className="error-message">
        <FormattedMessage id="app.categories.imageBigSize"/>
      </span>}
      <hr className="category-image-line"/>
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
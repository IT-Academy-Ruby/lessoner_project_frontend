import "./categoryImage.scss";
import {FormattedMessage} from "react-intl";
import Select from "../../../../icons/select.svg";
import Upload from "../../../../icons/download.svg";
import {useRef} from "react";

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

  const handleChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectImage(event.target.files ? event.target.files[0] : null)
    console.log(selectImage)
    if (selectImage!["size"] > 524) {
      console.log(error)
  error = "ggggg"
      console.log(error)
    }
  }
  const handleUpload = () => {
    // console.log(event?event.target:"ppp")
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
        // onChange={(event:React.FormEvent<HTMLButtonElement>)=>{
        //   console.log(event)}}
        type="button"
      >
        <img src={Select} alt="Select file" className="button-image"/>
        <FormattedMessage id="app.categories.button.select"/>
      </button>

      {/*<div className="category-field">*/}
      {/*<img src={Upload} alt="upload"/>*/}
      {/*<span className="upload-text category-upload">*/}
      {/*  <FormattedMessage id="app.categories.uploadImage"/>*/}
      {/*</span>*/}

      {/*<div className="upload-buttons">*/}
      {/*  <span className="upload-text">*/}
      {/*    <FormattedMessage id="app.categories.dragAandDrop"/>*/}
      {/*  </span>*/}
      {/*  <span className="upload-text margin-or">*/}
      {/*    <FormattedMessage id="app.categories.or"/>*/}
      {/*  </span>*/}

      {/*</div>*/}
      {error && <span className="error-message">{error}</span>}
      {/*</div>*/}
      <hr className="category-image-line"/>
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
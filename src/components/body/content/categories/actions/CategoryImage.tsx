import "./categoryImage.scss";
import {FormattedMessage, useIntl} from "react-intl";
// import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import Button from "../../../../Button";
import Change from "../../../../icons/Change.svg";
import Delete from "../../../../icons/DeleteButton.svg";
import {IMAGE_DATA} from "../../../../../constants";
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
  selectImage: {size:number,image:Blob,name:string};
  setSelectImage: (object:object) => void;
  getImage: string;
}

const CategoryImage = ({error, selectImage, setSelectImage, field, getImage}: CategoryImageProps) => {
  const intl = useIntl();
  // const dispatch = useAppDispatch();
  const fileRef = useRef<HTMLInputElement>(null);
  const [isLargeFile, setIsLargeFile] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (event.target.files) {
      const file = {
        image: event.target.files[0],
        size: event.target.files[0]["size"],
        name: event.target.files[0]["name"],
        type:event.target.files[0]["type"]
      };
      setSelectImage(file);
      if (selectImage!.size > IMAGE_DATA.size) {
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

    // let blob  = await fetch(getImage).then(r => r.blob());
    // if (getImage) {
    //   console.log(async ()=>await fetch(getImage).then(r => r.blob()))
    // }
    return (
      <div className="category-label">

        <FormattedMessage id="app.categories.uploadCategoryImage"/>
        {!selectImage.name && <>
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
        {selectImage.name && <>
        <span className="upload-image">
           <FormattedMessage id="app.categories.uploadImage"/>
        </span>
          <div className="image-add-field">
            <img
              src={URL.createObjectURL(selectImage.image)}
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
                onClick={() => setSelectImage({name:null})}
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
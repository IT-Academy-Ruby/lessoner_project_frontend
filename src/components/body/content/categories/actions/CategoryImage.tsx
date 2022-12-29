import "./categoryImage.scss";
import {
  Fragment, useRef, useState
} from "react";
import Change from "../../../../icons/change.svg";
import Delete from "../../../../icons/deleteRed.svg";
import { FormattedMessage } from "react-intl";
import Select from "../../../../icons/select.svg";

type CategoryImageProps = {
  field: {
    name: string;
    onClick: () => void,
    value: string | undefined;
  },
  error?: string | undefined,
  isAdd: boolean,
}

const CategoryImage = ({ error, isAdd }: CategoryImageProps) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploadingStatus, setUploadingStatus] = useState(isAdd ? "no image" : "finish uploading");
  const handleUpload = () => {
    if (fileRef.current) {
      fileRef.current.click();
    };
    setUploadingStatus("start uploading");
  };
  const setUploadingFileView = () => {
    switch (uploadingStatus) {
    case "no image":
      return (
        <Fragment>
          <div className="category-image-description">
            <FormattedMessage id="app.categories.uploadCategoryImageDescription" />
          </div>
          <div>
            <button className="category-image-button-upload" onClick={handleUpload} type="button">
              <img src={Select} alt="Select file" className="button-image" />
              <FormattedMessage id="app.categories.button.upload" />
            </button>
            {error && <span className="error-message">{error}</span>}
          </div>
        </Fragment>
      );
    case "start uploading":
      return (
        <Fragment>
          <div className="category-image-uploading">
            <FormattedMessage id="app.categories.uploadingFileCategoryImage" />
          </div>
        </Fragment>
      );
    case "finish uploading":
      return (
        <Fragment>
          <div className="category-image-uploading">
            <FormattedMessage id="app.categories.uploadedFileCategoryImage" />
          </div>
          <div className="image-category-field">
            <div className="change-delete-buttons">
              <button className="category-image-button-change" type="button">
                <img src={Change} alt="Change file" className="button-image" />
                <FormattedMessage id="app.categories.button.change" />
              </button>
              <button className="category-image-button-delete" type="button">
                <img src={Delete} alt="Delete file" className="button-image" />
                <FormattedMessage id="app.categories.button.delete" />
              </button>
            </div>
            {error && <span className="error-message">{error}</span>}
          </div>
        </Fragment>
      );
    }
  };

  return (
    <div className="category-label">
      <FormattedMessage id="app.categories.uploadCategoryImage" />
      {setUploadingFileView()}
    </div>
  );
};
CategoryImage.displayName = "CategoryImage";
export default CategoryImage;
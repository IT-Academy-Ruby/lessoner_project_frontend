import "./modalCategory.module.scss";
import {Button} from "../../../../Button";
import {useIntl} from "react-intl";

type ModalCategoryProps = {
  setIsClose: (value: boolean) => void;
  onClickYes: () => void;
  title: string;
}

export const ModalCategory = ({
  setIsClose, onClickYes, title
}: ModalCategoryProps) => {
  const intl = useIntl();
  return (
    <div className="wrapper-modal">
      <div className="cancel-modal">
        <div className="field-close">
          <span className="close-modal" onClick={() => setIsClose(false)}/>
        </div>
        <span className="close-text">
          {title}
        </span>
        <div className="field-button">
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.categories.button.yes"})}
            className="button-no"
            onClick={onClickYes}/>
          <Button
            buttonType="button"
            buttonText={intl.formatMessage({id: "app.categories.button.no"})}
            className="button-select"
            onClick={() => setIsClose(false)}/>
        </div>
      </div>
    </div>
  );
};
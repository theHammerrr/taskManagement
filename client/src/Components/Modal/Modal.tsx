import React from "react";
import "./Modal.css";

export interface iModalProps extends React.PropsWithChildren {
  handleOnClose: () => void;
  handleOnSave: () => void;
}

const CLOSE_BUTTON_TEXT = "ביטול";
const SAVE_BUTTON_TEXT = "שמירה";

const Modal: React.FC<iModalProps> = ({
  handleOnClose,
  handleOnSave,
  children,
}: iModalProps) => {
  return (
    <div className={"modal-overlay"}>
      <div className="modal-content">
        {children}
        <div className="modal-bottom-buttons">
          <button className="modal-close" onClick={handleOnClose}>
            {CLOSE_BUTTON_TEXT}
          </button>
          <button className="modal-save" onClick={handleOnSave}>
            {SAVE_BUTTON_TEXT}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

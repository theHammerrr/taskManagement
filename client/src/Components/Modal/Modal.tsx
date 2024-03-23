import React, { ReactElement, useState } from "react";
import "./Modal.css";

export interface iModalProps extends React.PropsWithChildren {
  handleOnClose: () => void;
  handleOnSave: () => void;
  children?: ReactElement;
}

const Modal: React.FC<iModalProps> = ({
  //   showModal = false,
  handleOnClose,
  handleOnSave,
  children,
}: iModalProps) => {
  //   const [isModalOpen, setModalOpen] = useState<boolean>(true);
  return (
    <div className={"modal-overlay"}>
      <div className="modal-content">
        {/* <span className="title">{title}</span> */}
        {children}
        <div className="modal-bottom-buttons">
          <button className="modal-close" onClick={handleOnClose}>
            ביטול
          </button>
          <button className="modal-save" onClick={handleOnSave}>
            שמירה
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

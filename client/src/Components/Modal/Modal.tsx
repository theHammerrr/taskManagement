import React, { ReactElement } from "react";
import './Modal.css'

export interface iModalProps extends React.PropsWithChildren {
    onClose: () => void,
    showModal: boolean,
    title: string,
    children?: ReactElement
}


const Modal: React.FC<iModalProps> = ({
    onClose,
    showModal = false,
    title,
    children
}: iModalProps) => {
    return (
        <div className={(showModal ? "show-modal" : "hide-modal") + " modal-overlay"}>
            <div className="modal-content">
                <div className="title">{title}</div>
                {children}
                <div className="modal-bottom-buttons">
                    <button className="modal-close" onClick={onClose}>ביטול</button>
                    <button className="modal-save">שמירה</button>
                </div>
            </div>
        </div>
    )
}

export default Modal
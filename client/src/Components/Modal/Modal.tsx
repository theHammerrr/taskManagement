import React, { ReactElement } from "react";
import './Modal.css'

export interface iModalProps extends React.PropsWithChildren {
    onClose: () => void,
    onSave: () => void,
    showModal: boolean,
    title: string,
    children?: ReactElement
}


const Modal: React.FC<iModalProps> = ({
    onClose,
    showModal = false,
    title,
    children,
    onSave
}: iModalProps) => {
    return (
        <>
            {
                showModal &&
                <div className={"modal-overlay"}>
                    <div className="modal-content">
                        <div className="title">{title}</div>
                        {children}
                        <div className="modal-bottom-buttons">
                            <button className="modal-close" onClick={onClose}>ביטול</button>
                            <button className="modal-save" onClick={onSave}>שמירה</button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal
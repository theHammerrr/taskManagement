import React, { ReactElement } from "react";
import './Modal.css'
import { v4 as uuidv4 } from 'uuid';

// import {
//     ModalComponent,
//     eContentTypesInModal,
//     iModalGenericContentProps
// } from "./ModalContentTypes";

export interface iModalProps extends React.PropsWithChildren {
    onClose: () => void,
    showModal: boolean,
    title: string,
    // contentTypesArray: iModalGenericContentProps[], 
    children?: ReactElement
}


const Modal: React.FC<iModalProps> = ({
    onClose,
    showModal = false,
    title,
    // contentTypesArray = [],
    children
}: iModalProps) => {
    return (
        <div className={(showModal ? "show-modal" : "hide-modal") + " modal-overlay"}>
            <div className="modal">
                <div className="modal-content">
                    <div className="title">{title}</div>
                    {/* {
                        contentTypesArray.map((genericContent) =>
                            <ModalComponent
                                key={uuidv4()}
                                contentType={genericContent.contentType}
                                modalContent={genericContent.modalContent}
                            />
                        )
                    } */}
                    {children}
                    <div className="modal-bottom-buttons">
                        <button className="modal-close" onClick={onClose}>ביטול</button>
                        <button className="modal-save">שמירה</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
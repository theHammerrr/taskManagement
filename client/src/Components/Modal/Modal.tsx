import React from "react";
import './Modal.css'
import {v4 as uuidv4} from 'uuid';

import {
    ModalComponent,
    eContentTypesInModal,
    iModalGenericContentProps
} from "./ModalContentTypes";

interface iModalProps {
    onClose: () => void,
    showModal: boolean,
    title: string,
    contentTypesArray: iModalGenericContentProps[]
}


const Modal: React.FC<iModalProps> = ({
    onClose,
    showModal = false,
    title,
    contentTypesArray = [], 
}: iModalProps) => {
    return (
        <div className={(showModal ? "show-modal" : "hide-modal") + " modal"}>
            <div className="modal-content">
                <div className="title">{title}</div>
                {
                    contentTypesArray.map((genericContent) => 
                            <ModalComponent
                                key={uuidv4()}
                                contentType={eContentTypesInModal.INPUT}
                                modalContent={genericContent.modalContent}
                            />
                    )
                }

                {/* <button className="close" onClick={onClose}>&times;</button> */}
            </div>
        </div>
    )
}

export default Modal
import React from "react";
import './Modal.css'
import {
    ModalComponent,
    eContentTypesInModal,
    iModalInputProps,
    iModalGenericContentProps
} from "./ModalContentTypes";

interface iTaskModal {
    onClose: () => void,
    showModal: boolean,
    title: string,
    contentTypesArray: iModalGenericContentProps[]
}


const Modal: React.FC = ({
    onClose,
    showModal = false,
    title,
    contentTypesArray = []
}: iTaskModal) => {
    // console.log(contentTypesArray);
    

    return (
        <div className={(showModal ? "show-modal" : "hide-modal") + " modal"}>
            <div className="modal-content">
                <div className="title">{title}</div>
                {/* <ModalComponent type={eContentTypesInModal.INPUT} iModalInputProps={{title: "asd"}} > */}
                {/* <ModalComponent contentType={eContentTypesInModal.INPUT} modalContent={modalInputProps}> */}
                {/* asd */}
                {/* </ModalComponent> */}
                {/* <>
                    ${getModalComponent(eContentTypesInModal.INPUT, modalInputProps)}
                </> */}
                {
                    contentTypesArray.forEach((genericContent) => 
                            <ModalComponent
                                contentType={eContentTypesInModal.INPUT}
                                // modalContent={genericContent.modalContent}
                                 />
                        
                    )
                }
                {/* <ModalComponent contentType={eContentTypesInModal.INPUT} ></ModalComponent> */}

                <button className="close" onClick={onClose}>&times;</button>
            </div>
        </div>
    )
}

export default Modal
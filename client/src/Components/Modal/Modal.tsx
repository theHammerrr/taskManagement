import React, { ReactElement } from "react";
import './Modal.css'

export interface iModalProps extends React.PropsWithChildren {
    showModal: boolean,
    title: string,
    children?: ReactElement
}


const Modal: React.FC<iModalProps> = ({
    showModal = false,
    title,
    children
}: iModalProps) => {
    return (
        <>
            {
                showModal &&
                <div className={"modal-overlay"}>
                    <div className="modal-content">
                        <span className="title">{title}</span>
                        {children}
                    </div>
                </div>
            }
        </>
    )
}

export default Modal
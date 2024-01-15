import React from "react";
import './ModalContentTypes.css'

export enum eContentTypesInModal {
    INPUT = "input",
    DROP_DOWN = "drop_down"
}


export interface iModalGenericContentProps {
    contentType: eContentTypesInModal, 
    modalContent: iModalContentProps
}

interface iModalContentProps {
    title: string,
    value: string,
    setValue: (value: string) => void
}


export interface iModalInputProps extends iModalContentProps {
    placeholder: string
}

export const ModalComponent: React.FC<iModalGenericContentProps> = ({
    contentType, 
    modalContent
}: iModalGenericContentProps)  => {
    switch (contentType) {
        case eContentTypesInModal.INPUT:
            return <ModalInput {...modalContent as iModalInputProps} />
        default:
            return <></>
    }
}

const ModalInput: React.FC<iModalInputProps> = ({
    title,
    placeholder,
    value,
    setValue
}: iModalInputProps) => {
    return (
        <>
            <div className="modal-title">{title}</div>
            <input 
                className="modal-input" 
                placeholder={placeholder} 
                value={value} 
                onChange={() => console.log(123)}></input>
        </>
    )
}
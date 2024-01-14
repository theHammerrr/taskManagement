import React from "react";

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

}

export const ModalComponent: React.FC<iModalGenericContentProps> = ({
    contentType, 
    modalContent
}: iModalGenericContentProps)  => {
    console.log(123);
    
    switch (contentType) {
        case eContentTypesInModal.INPUT:
            return <ModalInput {...modalContent} />
        default:
            return <></>
    }
}

const ModalInput: React.FC<iModalInputProps> = ({
    title
}: iModalInputProps) => {
    console.log(title);
    
    return (
        <>
            <div>{title}</div>
            <input></input>
        </>
    )
}
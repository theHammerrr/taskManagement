// import React, { useState } from "react";
// import './ModalContentTypes.css'
// import ModalInput, { iModalInputProps } from "./ModalTypes/ModalInput/ModalInput";
// import ModalDropdown from "./ModalTypes/ModalDropdown/ModalDropdown";

// export enum eContentTypesInModal {
//     INPUT = "input",
//     DROP_DOWN = "drop_down"
// }


// export interface iModalGenericContentProps {
//     contentType: eContentTypesInModal, 
//     modalContent: iModalContentProps
// }

// export interface iModalContentProps {
//     title: string,
//     value: string,
//     setValue: (value: string) => void
// }

// export const ModalComponent: React.FC<iModalGenericContentProps> = ({
//     contentType, 
//     modalContent
// }: iModalGenericContentProps)  => {
//     switch (contentType) {
//         case eContentTypesInModal.INPUT:
//             return <ModalInput {...modalContent as iModalInputProps} />
//         case eContentTypesInModal.DROP_DOWN:
//             return <ModalDropdown />
//         default:
//             return <></>
//     }
// }

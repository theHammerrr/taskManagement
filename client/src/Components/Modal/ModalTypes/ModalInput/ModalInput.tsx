// import React, { useState } from "react";
// import './ModalInput.css'
// import { iModalContentProps } from "../../ModalContentTypes";
 
// export interface iModalInputProps extends iModalContentProps {
//     placeholder: string
// }

// const ModalInput: React.FC<iModalInputProps> = ({
//     title,
//     placeholder,
//     value,
//     setValue
// }: iModalInputProps) => {
//     const [localValue, setLocalValue] = useState<string>("")

//     const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const value = event.target.value
//         console.log(value);
        

//         setLocalValue(value)
//         setLocalValue(value)
//     }

//     return (
//         <div className="modal-input-container">
//             <div className="modal-title">{title}</div>
//             <input 
//                 className="modal-input" 
//                 placeholder={placeholder} 
//                 value={localValue} 
//                 onChange={handleOnChange}
//                 >
//                 </input>
//         </div>
//     )
// }

// export default ModalInput
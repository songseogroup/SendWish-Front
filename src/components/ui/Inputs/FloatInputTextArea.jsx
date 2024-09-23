import React,{useState} from 'react'
import { InputTextarea } from "primereact/inputtextarea";
import { FloatLabel } from "primereact/floatlabel";
import { twMerge } from 'tailwind-merge';
const FloatInputTextArea = ({labelclass='',label="",id,...props}) => {

  return (
   
    <FloatLabel >
    <InputTextarea  id={id} {...props} />
    <label 
        htmlFor={id} 
        className={twMerge(
          'font-poppins label-base', 
          labelclass, 
        )}
      >
        {label}
      </label>
  </FloatLabel>
  
  )
}

export default FloatInputTextArea
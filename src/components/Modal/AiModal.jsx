import { senderAiMessage } from '../../core/services/userData.service';
import React, { useState } from 'react';

export const AiModal = ({ isOpen, onClose, setNewMessage }) => {
  if (!isOpen) return null;
  const [recipient,setReciepent] = useState("")
  const [relation ,setRelation] = useState("")
   const [occasion,setOccasion] = useState("")

   const handleSubmit = async ()=>{
     if (recipient === ""){
      
     }else if (relation === ""){
      
     }else if (occasion === ""){
      
     }else {
      const response =await senderAiMessage({
        "recipient":recipient,
        "occasion":occasion,
        "relation":relation
    })
    console.log("saajna",response?.data?.message)
     setNewMessage(response?.data?.message)
     onClose()
     }
   }
  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50">

      <div className="bg-white rounded-lg bg-white	m-1  max-w-lg w-full p-6 sm:p-8 md:p-10 relative bg-white" style={{background:"white"}}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Magic Message Writer</h2>
        <p className="text-gray-600 bg-white	 text-sm text-center mb-6">
          Answer the prompts and we will help you write the perfect message. You can edit the generated message yourself at any time.
        </p>

        {/* Recipient Name */}
        <div className="mb-4">
          <label htmlFor="recipientName" className="block text-gray-700 font-medium mb-2">
            Who is the message for?
          </label>
          <input
            type="text"
            id="recipientName"
            onChange={(e) => {
              setReciepent(e.target.value)
            }}
            placeholder="Recipient Name"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Occasions */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">The occasion is</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button style={{color:"white"}} onClick={()=>{setOccasion("Farewell")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Farewell</button>
            <button style={{color:"white"}} onClick={()=>{setOccasion("Birthday")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Birthday</button>
            <button style={{color:"white"}} onClick={()=>{setOccasion("Funeral")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Funeral</button>
            <button style={{color:"white"}} onClick={()=>{setOccasion("Wedding")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Wedding</button>
          </div>
        </div>

        {/* Recipient Relationship */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">The recipient is my</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            <button style={{color:"white"}} onClick={()=>{setRelation("Friend")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Friend</button>
            <button style={{color:"white"}} onClick={()=>{setRelation("Colleague")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Colleague</button>
            <button style={{color:"white"}} onClick={()=>{setRelation("Parent")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Parent</button>
            <button style={{color:"white"}} onClick={()=>{setRelation("Sibling")}} className="bg-primary text-white py-2 px-4 rounded font-poppins hover:bg-light-green">Sibling</button>
          </div>
        </div>

        {/* Clear and Generate Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            style={{color:"white"}} 
            className="bg-primary  text-gray-700 py-2 px-4 rounded hover:bg-light-green"
            onClick={() => { setOccasion(''),setReciepent(''),setRelation('') }}
          >
            Clear all
          </button>
          <button
            type="button"
            style={{color:"white"}} 
            className="bg-primary  text-white py-2 px-4 rounded hover:bg-light-green"
            onClick={() => { handleSubmit()}}
          >
            Generate message
          </button>
        </div>

        {/* Close Button */}
        <button
          type="button" 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
};
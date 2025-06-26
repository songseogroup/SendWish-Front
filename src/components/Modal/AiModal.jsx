import { senderAiMessage } from '../../core/services/userData.service';
import React, { useState,useRef } from 'react';
import { Toast } from "primereact/toast";

export const AiModal = ({ isOpen, onClose, setNewMessage }) => {
  if (!isOpen) return null;
  const [recipient,setReciepent] = useState("")
  const [relation ,setRelation] = useState("")
   const [occasion,setOccasion] = useState("")
   const [loading, setloading] = useState(false);
   const [activeOccasion, setActiveOccasion] = useState("");
   const toast = useRef();
   const [activeRelation, setActiveRelation] = useState("");

   function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  }
  const handleRelationClick = (relation) => {
    setActiveRelation(relation); // Updates the active relation
    console.log("Selected Relation:", relation); // Use or log the selected relation
  };

   const handleSubmit = async ()=>{
    setloading(true)
     if (recipient === ""){
      toast.current.show({
        severity: "error",
        detail: `Please Select Recipient Name`,
      });
       setloading(false)
     }else if (activeRelation === ""){
      toast.current.show({
        severity: "error",
        detail: `Please Select Relation`,
      });
    setloading(false)
     }else if (activeOccasion === ""){
      toast.current.show({
        severity: "error",
        detail: `Please Select Occasion`,
      });
      setloading(false)
     }else {
      const response =await senderAiMessage({
        "recipient":recipient,
        "occasion":activeOccasion,
        "relation":activeRelation,
        "type":"g-sender",
        "date": formatDateToDDMMYYYY(new Date().toISOString())
    })
    console.log("saajna",response?.data?.message)
     setNewMessage(response?.data?.message)
     setloading(false)
     onClose()
     }
   }
   const handleButtonClick = (occasion) => {
    setActiveOccasion(occasion); // Updates the active occasion
    console.log("Selected Occasion:", occasion); // Log or use the selected occasion as needed
  };
  return (
    <div className="fixed inset-0 bg-black flex justify-center items-center z-50" onClick={()=>{onClose()}}>
      <Toast ref={toast} />

      <div className="bg-white rounded-lg bg-white	m-1  max-w-lg w-full p-6 sm:p-8 md:p-10 relative bg-white"  onClick={(e) => e.stopPropagation()}  style={{background:"white"}}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Swish AI Writer</h2>
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
          {["Farewell", "Birthday", "Funeral", "Wedding", "Special Occasion", "Charity"].map((occasion) => (
        <button
          key={occasion}
          onClick={() => handleButtonClick(occasion)}
          className={`py-2 px-4 rounded font-poppins ${
            activeOccasion === occasion ? "bg-light-green text-black" : "bg-primary text-white"
          } hover:bg-light-green`}
          style={{color:"white"}}
        >
          {occasion}
        </button>
      ))}       </div>
        </div>

        {/* Recipient Relationship */}
        <div className="mb-4">
          <p className="text-gray-700 font-medium mb-2">The recipient is</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {["Friend", "Colleague", "Parent", "Family", "Partner", "Beneficiary"].map((relation) => (
        <button
          key={relation}
          onClick={() => handleRelationClick(relation)}
          className={`py-2 px-4 rounded font-poppins ${
            activeRelation === relation ? "bg-light-green text-black" : "bg-primary text-white"
          } hover:bg-light-green`}
          style={{color:"white"}}
        >
          {relation}
        </button>
      ))}       </div>
        </div>

        {/* Clear and Generate Buttons */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            style={{color:"white"}} 
            className="bg-primary  text-gray-700 py-2 px-4 rounded hover:bg-light-green"
            onClick={() => { setOccasion(''),setReciepent(''),setRelation(''),setActiveOccasion() }}
          >
            Clear all
          </button>
          <button
            type="button"
            style={{color:"white"}} 
            className="bg-primary  text-white py-2 px-4 rounded hover:bg-light-green"
            onClick={() => { handleSubmit()}}
          >
            {loading ?"Generating": "Let AI Generate message"}
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
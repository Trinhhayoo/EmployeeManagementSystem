import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";



const EmployeeCard = ({employee,imgEmployee}) => (
    <div className='w-full grid grid-cols-[0.5fr,3fr,2fr,2fr,2fr] items-center hover:bg-black-400/50 py-2 p-4 rounded-2xl cursor-pointer mb-2'>
      <h3 className='font-bold text-base text-100 mr-3'>
        {employee.id}
      </h3>
     
      <div className='flex flex-row  items-center  gap-6 '>
        <img 
          src = {imgEmployee}
          //{song?.images?.coverart} 
          alt={employee?.name} 
          className='w-20 h-20 hidden md:flex  rounded-2xl object-cover'
        />
        
          <Link to={`/employee/${employee.id}`}>
            <p className='text-black-100 '>
              {employee?.name}
             
            </p>
          </Link>
          </div >
          <div>
            {employee.job}
          </div>
          <div  className="hidden md:flex flex-col">
          <p className= 'text-gray-400   text-xs mt-1'> 
                {employee.contactNumber}
            </p>
            <p className='text-gray-400  text-xs mt-1'>
             {/* {song?.subtitle} */}
             {employee.email}
            </p>
            
          
          </div>
         
        

   <div className="flex flex-row">
   <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Edit
</button>
    <button></button>
   </div>
      
     
     
    </div>
  )
export default EmployeeCard;
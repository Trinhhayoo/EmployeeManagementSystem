// src/components/HomePage.js
import { Button } from '@material-tailwind/react';
import React from 'react';
import { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import data from "../assets/mockdata.json";
import { EmployeeCard } from '../components';

const HomePage = ()=> {
  const [showModal, setShowModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [employees, setEmployees] = useState([])
  const handleClick = ((e) => {
    
  })

  return (
   
    <div className='h-[calc(100vh-72px)]   overflow-y-scroll hide-scrollbar flex flex-col px-8 pt-4 bg-white  mx-14 mt-8 rounded-lg  shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
     <div className='flex flex-row items-center'>
      <h3 className='flex-1 items-center font-bold'>COMPANY EMPLOYEES</h3>
      <button className= "bg-gray-400 border  text-black py-2 px-4 rounded-lg flex items-center gap-2 cursor-pointer "
              onClick={() => setShowModal(true)}
            ><IoMdAdd size="20" color="#fffff" />Add Employee</button>
         
     </div>
     <div className="border border-gray-300 h-[0.5px] w-full"></div>
     <div className=' px-4 mt-4 border-none bg-gray-100 grid grid-cols-[0.5fr,3fr,2fr,2fr,2fr] font-bold py-4'>
      <h1 className='col-span-1'>ID</h1>
      <h1>Name</h1>
      <h1>Positions</h1>
      <h1 className='hidden md:flex '>Contact</h1>
      <h1>Action</h1>
     
     </div>
     <div className="mt-4 flex flex-col gap-1  max-h-100 overflow-y-auto">
          {data?.map((employee) => (
            <div
            //  className="overflow-hidden"
              key={employee.id}>
              <EmployeeCard
               employee = {employee}
              />
             
       
            </div>
          ))}
        </div>
    </div>
  );
}

export default HomePage;

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import {BiSearch} from "react-icons/bi";
import {BiDownArrow} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";




import { logo } from "../assets";
import data from "../assets/mockdata.json";

const Employee = ({ handleClick }) => {
  const [showModal, setShowModal] = useState(false)
 

  return (

    <div id="sideBarItem" 
    
      className="max-h-100 overflow-y-auto w-full px-4" >
      <div className="flex flex-row items-center mt-2 mb-4">
        <h3 className="flex-1 text-white font-bold">Employees</h3>
        <AiOutlineClose className="md:hidden cursor-pointer" onClick={ handleClick} size={25} color="white" />

      </div>
      <div className="flex flex-row mb-1 items-center justify-center gap-2">
        <BiSearch color="white" size={30}/>
        <button className="bg-gray-400 border  text-black px-1 py-1 flex items-center gap-2 cursor-pointer rounded-3xl "
          onClick={() => setShowModal(true)}
        ><IoMdAdd size="20" color="#fffff" />Add Employee</button>
      </div>
      <div className="border border-gray-400 h-[0.005px] w-full"></div>
      {data.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={`employee/:${item.id}`}
            className="flex flex-row justify-start  my-8 text-xs font-medium gap-6  hover:text-gray-400 text-white "
          //  onClick={() => handleClick && handleClick()}
          >
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-8 h-8  rounded-full object-cover"
            />

            <div className="flex flex-col ">

              <div className="flex flex-row gap-2" >
                <p>
                  {item.name}
                </p>
                <p>{item.lastName}</p>
              </div>


              <div className="text-gray-400">
                {item.job}
              </div>

            </div>


          </NavLink>
        )
      })}


    </div>
  );
}

const EmployeeBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 
 
  return (
    <>
      <div  

     className="md:flex  hidden  flex-col w-[240px] py-2 px-2  items-center bg-searchBar "
      >

        <Employee   />
      </div>

      <div className="absolute  md:hidden block top-8 right-3">
        {mobileMenuOpen ? (
          <BiDownArrow
            className="w-6 h-6  cursor-pointer text-black mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6  cursor-pointer text-black mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute mt-10 h-screen w-2/3 backdrop-blur-lg backdrop-brightness-50 p-6 overflow-y-auto   md:hidden smooth-transition
      ${mobileMenuOpen ? "right-10" : "-left-full"}`}>
       
        <Employee handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default EmployeeBar;

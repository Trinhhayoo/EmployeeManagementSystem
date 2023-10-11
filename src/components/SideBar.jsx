import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";



import { logo } from "../assets";
import { links } from "../assets/constants";

const NavLinks = ({ handleClick}) =>{





return (

  <div id="sideBarItem" >
      {links.map((item) => { return (
        <NavLink
      key={item.name}
      to={item.to}
      className="flex flex-row justify-start items-center my-8 text-xs font-medium  hover:text-gray-400 text-white"
      onClick={() => handleClick && handleClick()}
    >
        <div className="flex flex-col items-center">
        <item.icon className="w-6 h-6 items-center" />
        {item.name}
        </div>
    
      
    </NavLink>
      )
      })}

     
  </div>
);
}

const SideBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[70px] py-2 px-2  items-center bg-background">
       
        <NavLinks />
      </div>

      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            className="w-6 h-6 z-10 text-gray-100 mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 z-10 text-gray-100 mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 backdrop-blur-lg backdrop-brightness-50 z-10 p-6 md:hidden smooth-transition
      ${mobileMenuOpen ? "left-0" : "-left-full"}`}>

        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default SideBar;

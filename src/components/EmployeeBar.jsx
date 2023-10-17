import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import {BiSearch} from "react-icons/bi";
import {BiDownArrow} from "react-icons/bi";
import {AiOutlineClose} from "react-icons/ai";
import { getDatabase, ref, onValue, get, child, set, orderByKey, limitToLast, query, update } from "firebase/database";
import { getStorage, uploadBytes } from "firebase/storage";
import { uploadBytesResumable, getMetadata, getDownloadURL, ref as sRef, listAll } from "firebase/storage";
import { database, storage } from '../firebaseStore/firebase';




import { logo } from "../assets";
import data from "../assets/mockdata.json";

const Employee = ({ handleClick }) => {
  const dbRef = ref(database);
  const [employees, setEmployees] = useState([]);
  const [imgEmployee, setImgEmployee] = useState([]);
  const [lastId,  setLastId] = useState();
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState("top-charts");

  useEffect(() => {
    // Thay đổi key khi component được mount lại hoặc focus

    setStatus("status-" + new Date().getTime());
    get(child(dbRef, `lastKey`)).then((snapshot) => {
      if (snapshot.exists()) {
          var temp = snapshot.val();
          setLastId(temp.lastId );
         
      } else {
          console.log("No data available");
      }
  }).catch((error) => {
      console.error(error);
  });
  }, []);
  useEffect(() => {
    const fetchImages = async () => {
      const folderRef = sRef(storage, 'files'); // Tạo tham chiếu đến thư mục "files"
      const result = await listAll(folderRef); // Sử dụng listAll để liệt kê tất cả các tệp trong thư mục
    
      const urlPromises = result.items.map(async (imageRef) => {
        return await getDownloadURL(imageRef);
      });
    
      return Promise.all(urlPromises);
    }
    
    const loadImages = async () => {
      const urls = await fetchImages();
      setImgEmployee(urls);
      
    }
    
    loadImages();
    }, [status]);
  useEffect( () => {
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        setEmployees(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
    
   

  }, [status]);

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
      {employees?.map((item,index) => {
        return (
          <NavLink
            key={item.data.id}
            to={`employee/${item.data.id}`}
            className="flex flex-row justify-start  my-8 text-xs font-medium gap-6  hover:text-gray-400 text-white "
          //  onClick={() => handleClick && handleClick()}
          >
            <img
              src={imgEmployee[index-1]}
              alt={item.data.name}
              className="w-8 h-8  rounded-full object-cover"
            />

            <div className="flex flex-col ">

              <div className="flex flex-row gap-2" >
                <p>
                  {item.data.name}
                </p>
                <p>{item.data.lastName}</p>
              </div>


              <div className="text-gray-400">
                {item.data.job}
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

// src/components/AboutPage.js
import React from 'react';
import { EmployeeBar } from '../components';
import data from "../assets/mockdata.json";
import {useState, useEffect} from 'react';
import { BiCircle } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getDatabase, ref, onValue, get, child, set, orderByKey, limitToLast, query, update } from "firebase/database";
import { getStorage, uploadBytes } from "firebase/storage";
import { database, storage } from '../firebase';
import { uploadBytesResumable, getMetadata, getDownloadURL, ref as sRef, listAll } from "firebase/storage";



const DetailEmployee = () => {
  const dbRef = ref(database);


  const maxRating = 5; // Số điểm tối đa




  const { id } = useParams();

  const [status, setStatus] = useState("top-charts");
  const [info, setInfor] = useState();
  const [imgEmployee, setImgEmployee] = useState();


  useEffect(() => {
    // Thay đổi key khi component được mount lại hoặc focus

    setStatus("status-" + new Date().getTime());
   
  }, []);
  useEffect(() => {
    const fetchImage = async (id) => {
      const imageRef = ref(storage, `files/${id}`); // Tạo tham chiếu đến hình ảnh cụ thể
      const url = await getDownloadURL(imageRef); // Lấy URL tải xuống hình ảnh
      
      return url;
    }
    
    const loadImage = async () => {
     // Thay thế 1 bằng ID của hình ảnh cụ thể bạn muốn hiển thị
      const url = await fetchImage(parseInt(id, 10));
      
      setImgEmployee(url);
    }
    
    loadImage();
    }, [status]);
  useEffect( () => {
    onValue(child(dbRef, `users/${parseInt(id, 10)}`), (snapshot) => {
      const data = snapshot.val();
      debugger
     setInfor(data);
    });
   

  }, [status]);


 // const e = data.find((item) => item.id === parseInt(id, 10));
  const renderSkillRating = (rating) => {
    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-1 ">

        {info?.skills.map((skill, index) => (
          <div key={index} className="flex flex-row items-center py-0.5 gap-1">
            {skill.name}: {renderRatingStars(skill.rating)}
          </div>
        ))}
      </div>
    );
  };

  const renderRatingStars = (rating) => {
    return (
      <>
        {Array(maxRating)
          .fill(0)
          .map((_, index) => (
            <span
              key={index}
              className={`${index < rating ? 'bg-green-500' : 'bg-gray-300 rounded-full'
                }`}
            >
              <BiCircle size={10} />
            </span>
          ))}
      </>
    );
  };

  return (


    <div className=' md:grid grid-cols-[1fr,3fr] gap-6 pt-4  flex flex-col'>
      <div className='flex flex-col gap-4 min-h-screen'>
        <div className='flex flex-col gap-1'>
        <div className='md:hidden flex flex-row gap-1 justify-center'>
            <p className='font-bold  text-4xl'>{info?.name}</p>
            <p className='font-bold text-4xl'>{info?.lastName}</p>
          </div>
          <p className='md:hidden flex text-gray-500 justify-center'>{info?.job}</p>

          <img src={imgEmployee} alt="avt" className='md:w-[260px] h-70 object-cover rounded-lg mb-2 w-screen'  />
          <div className='md:flex flex-row gap-1 hidden'>
            <p className='font-bold'>{info?.name}</p>
            <p className='font-bold '>{info?.lastName}</p>
          </div>

          <p className='hidden md:flex text-gray-500'>{info?.job}</p>
        </div>
        <div className='flex flex-col'>
          <div className='grid grid-cols-[1fr,1fr,0.3fr] text-gray-500 text-xs'>
            <p> Hire date </p>
            <p> Date of birth </p>
            <p>Age</p>

          </div>
          <div className='grid grid-cols-[1fr,1fr,0.3fr]'>
            <p>{info?.dob}</p>
            <p>{info?.dob}</p>
            <p>{info?.age}</p>

          </div>
          <div className="border border-gray-300 h-[0.5px] w-full mt-4"></div>

        </div>
        <div className='flex flex-col gap-4'>
          {info?.leave?.map((item, index) => (
            <div key={index} className="flex flex-row bg-white rounded-lg">
              <div className="h-full w-1 bg-orange-500 rounded-lg overflow-hidden"></div>
              <div className=" flex flex-row p-3 items-center">
                <p className='text-orange-500 mr-4 text-3xl'>{item.hour}</p>
                <p> hours of {item.name} leave</p>
              </div>
            </div>
          ))}
        </div>



      </div>
      <div className='border-none bg-white bg-cover flex-col flex flex-grow px-4  '>
        <div className="flex justify-end mt-2 mr-4">
          <FiEdit size={30} />
        </div>
        <div className="border border-gray-300 h-[0.5px] w-full mt-4"></div>


        <div className='mt-4 flex flex-col'>
          <div className='grid grid-cols-[1fr,1fr]'>
            <div className="p-4 ">
              <fieldset className="border border-gray-300 p-4 rounded-lg">
                <legend className="text-lg font-semibold">Contact details</legend>

                <div className='grid grid-cols-2 grid-rows-2 overflow-hidden '>
                  <div className='flex flex-col  mb-[12px]'>
                    <p className=' text-gray-500 text-xs'>Skype</p>
                    <p className='text-sm'>{info?.name}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Email</p>
                    <p className='text-sm'>{info?.email}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Phone</p>
                    <p className='text-sm'>{info?.contactNumber}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Home phone</p>
                    <p className='text-sm'>{info?.contactNumber}</p>
                  </div>
                </div>

              </fieldset>

            </div>
            <div className="p-4">
              <fieldset className="border border-gray-300 p-4 rounded-lg">
                <legend className="text-lg font-semibold">Job information</legend>
                <div className='grid grid-cols-3 grid-rows-2 overflow-hidden space-between '>
                  <div className='flex flex-col  mb-[12px]'>
                    <p className=' text-gray-500 text-xs'>Personal number</p>
                    <p className='text-sm'>{info?.id}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Department</p>
                    <p className='text-sm'>{info?.Department}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Position</p>
                    <p className='text-sm'>{info?.job}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Work location</p>
                    <p className='text-sm'>{info?.location}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Supervisor</p>
                    <p className='text-sm'>{info?.supervisor}</p>
                  </div>
                  <div>
                    <p className=' text-gray-500 text-xs'>Work shift</p>
                    <p className='text-sm'>{info?.workShip}</p>
                  </div>
                </div>

              </fieldset>
            </div>
          </div>
          <div className='flex flex-col p-4'>
            <p>Skills</p>
            <div>
              {renderSkillRating()}
            </div>

          </div>



        </div>
        <div className='grid grid-cols-[1fr,1fr]'>
          <div className="p-4">
            <fieldset className="border border-gray-300 p-4 rounded-lg">
              <legend className="text-lg font-semibold">Education</legend>
              {info?.Education?.map((item,index) => (
                <div>
                  <div className='grid grid-cols-2 grid-rows-2' key={item.id}>
                    <div className='flex flex-col'>
                      <p className=' text-gray-500 text-xs'>Name</p>
                      <p className='text-sm'>{item.name}</p>
                    </div>
                    <div>
                      <p className=' text-gray-500 text-xs'>Specialization</p>
                      <p className='text-sm'>{item.Specialization}</p>
                    </div>
                    <div>
                      <p className=' text-gray-500 text-xs'>Date</p>
                      <p className='text-sm'>{item.Date}</p>
                    </div>
                    <div>
                      <p className=' text-gray-500 text-xs'>Upload Document</p>
                      <p className='text-sm'>{item['Upload Document']}</p>
                    </div>


                  </div>
                  {index !== info?.Education?.length - 1 && (
                  <div className="border border-gray-300 h-[0.5px] w-full mb-4"></div>

      )}
                </div>



              ))}
            </fieldset>
          </div>
          <div className="p-4">
            <fieldset className="border border-gray-300 p-4 rounded-lg">
              <legend className="text-lg font-semibold">Courses</legend>
              {info?.Course?.map((item,index) => (
                <div>
                  <div className='grid grid-cols-2 grid-rows-2' key={item.id}>
                    <div className='flex flex-col'>
                      <p className=' text-gray-500 text-xs'>Name</p>
                      <p className='text-sm'>{item.name}</p>
                    </div>
                    <div>
                      <p className=' text-gray-500 text-xs'>Specialization</p>
                      <p className='text-sm'>{item.Description}</p>
                    </div>
                    <div>
                      <p className=' text-gray-500 text-xs'>Date</p>
                      <p className='text-sm'>{item.Date}</p>
                    </div>
                    <div>
                      <p className=' text-gray-500 text-xs'>Upload Document</p>
                      <p className='text-sm'>{item['Upload Document']}</p>
                    </div>


                  </div>
                  {index !== info?.Course?.length - 1 && (
                  <div className="border border-gray-300 h-[0.5px] w-full mb-4"></div>

      )}
                </div>



              ))}
            </fieldset>
          </div>
        </div>
      </div>


    </div>


  );
}

export default DetailEmployee;

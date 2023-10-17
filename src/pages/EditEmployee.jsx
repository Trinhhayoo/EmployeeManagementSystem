import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, get, child, set, orderByKey, limitToLast, query, update } from "firebase/database";
import { getStorage, uploadBytes } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL, ref as sRef } from "firebase/storage";
import { database, storage } from '../firebase';
import { useParams } from "react-router-dom";
const EditEmployee = () => {
    const dbRef = ref(database);




    const leave = ["vacation", "sick", "courses", "other"];
    const skills = ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5", "skill 6", "skill 7", "skill 8", "skill 9"];
    const { id } = useParams();
    
    const [isAdd, setIsAdd] = useState(true);
    const [imgEmployee, setImgEmployee] = useState();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contatNumber, setContactNumber] = useState("");
    const [age, setAge] = useState();
    const [dob, setDob] = useState("");
    const [address, setAddress] = useState("");
    const [occupation, setOccupation] = useState("");
    const [department, setDepartment] = useState("");
    const [location, setLocation] = useState("");
    const [supervision, setSupervision] = useState("");
    const [workShift, setWorkshift] = useState("");
    const [leaveHour, setLeave] = useState([]);
    const [skillsHour, setSkill] = useState([]);
    const [file, setFile] = useState("");
    const [percent, setPercent] = useState(0);
   const [nameField,setNameField] = useState("");
   const [fields, setFields] = useState({
    educationField: [],
    courseField: [],
    trainingField: [],
    logField: []
  });


    useEffect(() => {
        onValue(child(dbRef, `users/${parseInt(id, 10)}`), (snapshot) => {
            const data = snapshot.val().data;
    
            setName(data.name);
            setLastName(data.lastName);
            setEmail(data.email);
            setContactNumber(data.contactNumber);
            setAge(data.age);
            setDob(data.dob);
            setAddress(data.address);
            setOccupation(data.job);
            setDepartment(data.Department);
            setSupervision(data.supervisor);
            setWorkshift(data.workShip);
            {
                data?.skills.map((item) => {
                    handleSkill(item.name, item.hours);
                }

                )

            };

            {
                data?.leave.map((item) => {
                    handleLeave(item.name, item.hours);
                })
            };
            {
                data?.Education.map((item) => {
                    handleAddField("educationField");
                    handleChange(item.id, item, "Edit", "educationField");
                   
                }

                )
            };
            {
                data?.Course.map((item) => {
                    handleAddField("courseField");
                    handleChange(item.id, item, "Edit", "courseField");
                    
                }

                )
            };
            {
                data?.Log.map((item) => {
                    handleAddField("logField");
                    handleChange(item.id, item, "Edit", "logField");
                    
                }

                )
            };
            {
                data?.Training.map((item) => {
                    handleAddField("trainingField");
                    handleChange(item.id, item, "Edit", "trainingField");
                  
                }

                )
            };
           
           

        });
       
    }, []);
   


    const handleImageChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleLeave = (leave, hour) => {
        const arrLeave = {
            "name": leave,
            "hours": hour
        }
        setLeave((prevLeaveHour) => [...prevLeaveHour, arrLeave]);
    };
    const handleSkill = (skill, hour) => {
        const arrSkill = {
            "name": skill,
            "hours": hour
        }
        setSkill((prevSkillHour) => [...prevSkillHour, arrSkill]);

    }



    const handleAddField = (fieldName) => {
        const newId = fields[fieldName].length + 1;
      
        // Clone the existing array for the specified field and add a new item
        const updatedField = [...fields[fieldName], { id: newId, name: "", specialization: "", date: "", uploadDocument: "" }];
      
        // Update the 'fields' object with the new array
        setFields({
          ...fields,
          [fieldName]: updatedField,
        });
      };
    
      
const handleChange = (index, event, status, fieldName) => {
    const updatedField = fields[fieldName];
  
    if (status === "Add") {
      const { id } = event.target;
      const field = id.split("-")[0];
      updatedField[index] = {
        ...updatedField[index],
        [field]: event.target.value,
      };
    } else {
      Object.keys(event).forEach((key) => {
        updatedField[index] = {
          ...updatedField[index],
          [key]: event[key],
        };
      });
    }
  
    setFields({
      ...fields,
      [fieldName]: updatedField,
    });
   
  };
    
    const handleSubmit = (event) => {
        event.preventDefault();



        // Tạo đối tượng JSON dữ liệu theo định dạng bạn cung cấp
        const data = {
            id: id,
            name: name,
            lastName: lastName,
            email: email,
            contactNumber: contatNumber,
            age: age,
            dob: dob,
            address: address,
            job: occupation,
            Department: department,
            location: location,
            supervisor: supervision,
            workShip: workShift,
            leave: leaveHour,
            skills: skillsHour,
            Education: fields["educationField"],
            Course: fields["courseField"],
            Log: fields["logField"],
            Training: fields["trainingField"]
            
        };



        update(child(dbRef, `users/${id}`), {
            data
        });
        const storageRef = sRef(storage, `/files/${data?.id}`);

        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );



    }
    return (
        <>
            <div className="container mx-auto">
                <div className="text">
                    Add Employee
                </div>
                <form action="#"
                    onSubmit={handleSubmit}
                >
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">First Name</label>
                        </div>
                        <div className="input-data">
                            <input type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Last Name</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Email Address</label>
                        </div>
                        <div className="input-data">
                            <input type="text"
                                value={occupation}
                                onChange={(e) => setOccupation(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Position</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Age</label>
                        </div>
                        <div className="input-data">
                            <input type="text"
                                value={contatNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Contact Number</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Address</label>
                        </div>
                        <div className="input-data">
                            <input type="text"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Date of birth</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text"
                                value={supervision}
                                onChange={(e) => setSupervision(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Suppervisor</label>
                        </div>
                        <div className="input-data">
                            <input type="text"
                                value={workShift}
                                onChange={(e) => setWorkshift(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Workship</label>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-data">
                            <input type="text"
                                value={department}
                                onChange={(e) => setDepartment(e.target.value)}
                                required />
                            <div className="underline"></div>
                            <label for="">Department</label>
                        </div>
                        <div className="input-data">
                            {/* <input type="text" required />
                            <div className="underline"></div>
                            <label for="">Avatar</label> */}
                            <input
                                type="file"
                                id="avatar"
                                className="hidden"
                                accept=".jpg, .jpeg, .png, .gif"
                                onChange={(e) => handleImageChange(e)}
                            />
                            <label
                                htmlFor="avatar"
                                className="flex flex-col items-center text-white hover:cursor-pointer">
                                <div className="text-white text-3xl">+</div>
                                Image
                            </label>
                        </div>
                    </div>
                    <div class="flex flex-wrap -mx-3 mb-2">
                        {
                            leave.map((item, index) => (
                                <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        {item}
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"
                                        onChange={(e) => handleLeave(item, e.target.value)}

                                        value={leaveHour[index]?.hours} />
                                </div>

                            ))
                        }

                    </div>
                    <h3>Skills</h3>
                    <div id="skill-list" className="grid grid-cols-3 grid-rows-3 gap-2 ">
                        {skills?.map((item, index) => (

                            <div class="relative">
                                <p>{item}</p>
                                <select  value={skillsHour[index]?.hours} onChange={(e) => handleSkill(item, e)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg class="fill-current items-center h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>

                        ))}


                    </div>
                    <p className="text-center font-bold text-3xl">Education</p>
                    {fields["educationField"]?.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        value={item?.name}
                                        onChange={(e) => handleChange(index, e, "Add", "educationField")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        value={item?.specialization}
                                        onChange={(e) => handleChange(index, e, "Add", "educationField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        value={item?.date}
                                        onChange={(e) => handleChange(index, e, "Add", "educationField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        value={item?.uploadDocument}
                                        onChange={(e) => handleChange(index, e, "Add", "educationField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}

                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={() => handleAddField("educationField")} />

                    <p className="text-center font-bold text-3xl">Course</p>
                    {fields["courseField"]?.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        value={item?.name}
                                        onChange={(e) => handleChange(index, e, "Add", "courseField")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        value={item?.specialization}

                                        onChange={(e) => handleChange(index, e, "Add", "courseField")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        value={item?.date}

                                        onChange={(e) => handleChange(index, e, "Add", "courseField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        value={item?.uploadDocument}

                                        onChange={(e) => handleChange(index, e, "Add", "courseField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}

                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={() => handleAddField("courseField")} />
                    <p className="text-center font-bold text-3xl">Training</p>
                    {fields["trainingField"]?.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        value={item?.name}

                                        onChange={(e) => handleChange(index, e, "Add", "trainingField")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name {}</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        value={item?.specialization}
                                        onChange={(e) => handleChange(index, e, "Add", "trainingField")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        value={item?.date}

                                        onChange={(e) => handleChange(index, e, "Add", "trainingField")}


                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        value={item?.uploadDocument}

                                        onChange={(e) => handleChange(index, e, "Add", "trainingField")}


                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}
                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={() => handleAddField("trainingField")} />
                    <p className="text-center font-bold text-3xl">Log</p>
                    {fields["logField"]?.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        value={item?.name}
                                        onChange={(e) => handleChange(index, e, "Add", "logField")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        value={item?.specialization}

                                        onChange={(e) => handleChange(index, e, "Add", "logield")}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        value={item?.date}

                                        onChange={(e) => handleChange(index, e, "Add", "logField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        value={item?.uploadDocument}

                                        onChange={(e) => handleChange(index, e, "Add", "logField")}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}

                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={() => handleAddField("logField")} />

                    <div className="form-row ">
                        <div className="input-data textarea">

                            <div className="form-row justify-center submit-btn">
                                <div className="input-data">
                                    <div className="inner"></div>
                                    <input type="submit"
                                        value="submit" />
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
export default EditEmployee;
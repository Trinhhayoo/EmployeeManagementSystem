import React from "react";
import { AiFillPlusCircle } from "react-icons/ai";
import { useState , useEffect} from "react";
import { getDatabase, ref, onValue, get, child, set, orderByKey, limitToLast, query, update } from "firebase/database";
import { getStorage, uploadBytes } from "firebase/storage";
import { uploadBytesResumable, getDownloadURL, ref as sRef } from "firebase/storage";

import { database, storage } from '../firebaseStore/firebase';
const AddEmployee = () => {
    const dbRef = ref(database);


    const leave = ["vacation", "sick", "courses", "other"];
    const skills = ["skill 1", "skill 2", "skill 3", "skill 4", "skill 5", "skill 6", "skill 7", "skill 8", "skill 9"];



    // State to store uploaded file
    const [file, setFile] = useState("");

    // progress
    const [percent, setPercent] = useState(0);
    const handleImageChange = (event) => {
        setFile(event.target.files[0]);
    }


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
    const [lastId, setLastId] = useState();
    
    useEffect(() => {
        get(child(dbRef, `lastKey`)).then((snapshot) => {
            if (snapshot.exists()) {
                var temp = snapshot.val();
                setLastId(temp.lastId + 1);
                debugger
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
      }, []);
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
            "hours": hour.target.value
        }
        setSkill((prevSkillHour) => [...prevSkillHour, arrSkill]);

    }


    const [educationField, setEducation] = useState([{ id: 1, name: "", specialization: "", date: "", uploadDocument: "" }]);
    const [courseField, setCourseField] = useState([{ id: 1, name: "", specialization: "", date: "", uploadDocument: "" }]);
    const [trainingField, setTraining] = useState([{ id: 1, name: "", specialization: "", date: "", uploadDocument: "" }]);
    const [logField, setLog] = useState([{ id: 1, name: "", specialization: "", date: "", uploadDocument: "" }]);
    const [selectedImage, setSelectedImage] = useState(null);
    const handleAddEducationField = () => {
        const newId = educationField.length + 1;
        setEducation([...educationField, { id: newId, value: "" }]);
    };

    const handleEducationChange = (index, event) => {

        // const updatedFields = educationField.map((field) =>
        //     field.id === id ? { ...field, value: newValue } : field
        // );
        // setEducation(updatedFields);
        const { id } = event.target;
        const field = id.split("-")[0]; // Extract the field name from the id

        const updatedEducationField = [...educationField];
        updatedEducationField[index] = {
            ...updatedEducationField[index],
            [field]: event.target.value,
        };

        setEducation(updatedEducationField);
    };
    const handleAddCourseField = () => {
        const newId = courseField.length + 1;
        setCourseField([...educationField, { id: newId, value: "" }]);
    };

    const handleCourseChange = (index, event) => {
        const { id } = event.target;
        const field = id.split("-")[0]; // Extract the field name from the id

        const updatedEducationField = [...courseField];
        updatedEducationField[index] = {
            ...updatedEducationField[index],
            [field]: event.target.value,
        };

        setCourseField(updatedEducationField);
    };
    const handleAddTrainingField = () => {
        const newId = trainingField.length + 1;
        setTraining([...educationField, { id: newId, value: "" }]);
    };

    const handleTrainingChange = (index, event) => {
        const { id } = event.target;
        const field = id.split("-")[0]; // Extract the field name from the id

        const updatedEducationField = [...trainingField];
        updatedEducationField[index] = {
            ...updatedEducationField[index],
            [field]: event.target.value,
        };

        setTraining(updatedEducationField);
    };
    const handleAddLogField = () => {
        const newId = logField.length + 1;
        setLog([...educationField, { id: newId, value: "" }]);
    };

    const handleLogChange = (index, event) => {
        const { id } = event.target;
        const field = id.split("-")[0]; // Extract the field name from the id

        const updatedEducationField = [...logField];
        updatedEducationField[index] = {
            ...updatedEducationField[index],
            [field]: event.target.value,
        };

        setLog(updatedEducationField);
    };





    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             const imageBlob = new Blob([e.target.result], { type: file.type });
    //             setSelectedImage(URL.createObjectURL(imageBlob));
    //             // You can use the 'imageBlob' for further processing or uploading.
    //         };
    //         reader.readAsArrayBuffer(file);
    //     }
    // };




    const updateEducationData = (index) => {
        const newEducation = {};
        const name = document.getElementById(`name-${index}`).value;
        const specialization = document.getElementById(`specialization-${index}`).value;
        const date = document.getElementById(`date-${index}`).value;
        const uploadDocument = document.getElementById(`uploadDocument-${index}`).value;

        newEducation.id = index;
        newEducation.name = name;
        newEducation.specialization = specialization;
        newEducation.date = date;
        newEducation.uploadDocument = uploadDocument;


        setEducation([...educationField, newEducation]);

    }
    const updateCourseData = (index) => {
        const newCourse = {};
        const name = document.getElementById(`name-${index}`).value;
        const specialization = document.getElementById(`specialization-${index}`).value;
        const date = document.getElementById(`date-${index}`).value;
        const uploadDocument = document.getElementById(`uploadDocument-${index}`).value;

        newCourse.id = index;
        newCourse.name = name;
        newCourse.specialization = specialization;
        newCourse.date = date;
        newCourse.uploadDocument = uploadDocument;

        setCourseField([...courseField, newCourse]);

    }
    const updateTrainingData = (index) => {
        const newTraining = {};
        const name = document.getElementById(`name-${index}`).value;
        const specialization = document.getElementById(`specialization-${index}`).value;
        const date = document.getElementById(`date-${index}`).value;
        const uploadDocument = document.getElementById(`uploadDocument-${index}`).value;

        newTraining.id = index;
        newTraining.name = name;
        newTraining.specialization = specialization;
        newTraining.date = date;
        newTraining.uploadDocument = uploadDocument;

        setTraining([...trainingField, newTraining]);

    }
    const updateLogData = (index) => {
        const newLog = {};
        const name = document.getElementById(`name-${index}`).value;
        const specialization = document.getElementById(`specialization-${index}`).value;
        const date = document.getElementById(`date-${index}`).value;
        const uploadDocument = document.getElementById(`uploadDocument-${index}`).value;

        newLog.id = index;
        newLog.name = name;
        newLog.specialization = specialization;
        newLog.date = date;
        newLog.uploadDocument = uploadDocument;

        setLog([...logField, newLog]);

    }

    const handleSubmit = (event) => {
        event.preventDefault();
       


        // Tạo đối tượng JSON dữ liệu theo định dạng bạn cung cấp
        const data = {
            id: lastId,
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
            Education: educationField,
            Course: courseField,
            Training: trainingField,
            Log: logField
        };
      


        set(child(dbRef, `users/${data.id}`), {
            data
        });
        update(child(dbRef, `lastKey`), {
         lastId
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
                            leave.map((item) => (
                                <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                                        {item}
                                    </label>
                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text"
                                        onChange={(e) => handleLeave(item, e.target.value)}

                                        placeholder="Number" />
                                </div>

                            ))
                        }

                    </div>
                    <h3>Skills</h3>
                    <div id="skill-list" className="grid grid-cols-3 grid-rows-3 gap-2 ">
                        {skills.map((item) => (

                            <div class="relative">
                                <p>{item}</p>
                                <select onChange={(e) => handleSkill(item, e)} class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
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
                    {educationField.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        onChange={(e) => handleEducationChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        onChange={(e) => handleEducationChange(index, e)}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        onChange={(e) => handleEducationChange(index, e)}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        onChange={(e) => handleEducationChange(index, e)}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}

                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={handleAddEducationField} />

                    <p className="text-center font-bold text-3xl">Course</p>
                    {courseField.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        onChange={(e) => handleCourseChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        onChange={(e) => handleCourseChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        onChange={(e) => handleCourseChange(index, e)}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        onChange={(e) => handleCourseChange(index, e)}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}

                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={handleAddCourseField} />
                    <p className="text-center font-bold text-3xl">Training</p>
                    {trainingField.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        onChange={(e) => handleTrainingChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        onChange={(e) => handleTrainingChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        onChange={(e) => handleTrainingChange(index, e)}


                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        onChange={(e) => handleTrainingChange(index, e)}


                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}
                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={handleAddTrainingField} />
                    <p className="text-center font-bold text-3xl">Log</p>
                    {logField.map((item, index) => (
                        <div key={index}>


                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`name-${index}`}
                                        onChange={(e) => handleLogChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`name-${index}`}>Name</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`specialization-${index}`}
                                        onChange={(e) => handleLogChange(index, e)}

                                        required />
                                    <div className="underline"></div>
                                    <label for={`specialization-${index}`}>Specialization</label>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="input-data">
                                    <input type="text"
                                        id={`date-${index}`}
                                        onChange={(e) => handleLogChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`date-${index}`}>Date</label>
                                </div>
                                <div className="input-data">
                                    <input type="text"
                                        id={`uploadDocument-${index}`}
                                        onChange={(e) => handleLogChange(index, e)}
                                        required />
                                    <div className="underline"></div>
                                    <label for={`uploadDocument-${index}`}>Upload Document</label>
                                </div>
                            </div>
                            <div className="border mx-auto border-gray-400 h-[0.005px] w-1/2 justify-center"></div>

                        </div>

                    ))}

                    <AiFillPlusCircle className="mx-auto mt-4" size={30} onClick={handleAddLogField} />

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
export default AddEmployee;
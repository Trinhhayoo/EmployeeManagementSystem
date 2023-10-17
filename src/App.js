import { useSelector, useDispatch } from "react-redux";
import {
  useLocation,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import {
  SearchBar,
  SideBar,
  EmployeeCard,
  EmployeeBar

} from "./components";
import {
  SignIn,
  SignUp,
  HomePage,
  DetailEmployee,
  AddEmployee
  
} from "./pages";

import { setRegisterLogin } from "./redux/features/playerSlice";



const App = () => {
 

  const dispatch = useDispatch();
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (user) {
    dispatch(setRegisterLogin(user));
  }

  const { activeSong, isLogin } = useSelector((state) => state.player);

  const location = useLocation();
  const currentRoute = location.pathname;


  const noMusicPlayer = ["/signin", "/signup"];


 

  // set(child(dbRef, `users/2`), {
    
  //   id: 2,
  //   name: "Na"
  // });

  return (
    <div className="relative flex">
      <div className="flex flex-row">
      <SideBar />
    {currentRoute.includes("employee") && <EmployeeBar /> }
      </div>
     

      <div className=" flex-1 flex flex-col">
      {!currentRoute.includes("employee") &&  <SearchBar />  }  
        

        <div className="  flex xl:flex-row flex-col-reverse  bg-backgroundForMain">
          <div className="  pl-4 flex-1 pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/signin" element={<HomePage />} />
              <Route path="/signup" element={<HomePage />} />
              <Route path="/addEmployee" element={<AddEmployee />} />

              <Route
                path="/employee/:id" element={<DetailEmployee />} />
            </Routes>
          </div>
        
        </div>
      </div>

    
    </div>
  );
};

export default App;

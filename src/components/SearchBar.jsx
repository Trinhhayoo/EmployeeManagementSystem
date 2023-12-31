import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { selectUser } from "../assets";
import Na from "../assets/Na.jpeg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Button } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { setLogout } from "../redux/features/playerSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import provider from "../firebaseStore/auth_google_provider_scope";
import { app } from "../firebaseStore/firebase";
const auth = getAuth(app);

const SearchBar = () => {
  const { username } = useSelector((state) => state.player);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    //chuyển sang trang chứa kết quả search
    navigate(`/search/${searchTerm}`);
  };
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  };
  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleLogout = () => {
    dispatch(setLogout());
    sessionStorage.clear();
    navigate("/home");
  };
  return (
    <div className="flex  items-center pl-6 pr-6 pt-4 pb-4 gap-4 bg-background ">
      <div className="flex items-center gap-6 flex-1  rounded-[20px] bg-searchBar">
        <form
          onSubmit={handleSubmit}
          autoComplete="off"
          className="w-full text-gray-400 focus-within:text-gray-600">
          <div className="flex flex-row justify-start items-center">
            <FiSearch className="w-4 h-5 ml-4 text-gray-100" />
            <input
              name="search-field"
              autoComplete="off"
              id="search-field"
              placeholder="Search"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none placeholder-white text-sm text-gray-100 p-3"
            />
          </div>
        </form>
      </div>
      {!username ? (
        <div className=" flex flex-row gap-1">
          <Button
            id="signinOutside"
            onClick={handleSignIn}
            className="border border-blue-500 bg-blue-500 py-2 ">
            Sign in
          </Button>
          <Button
            id="signupOutside"
            onClick={handleSignUp}
            className="border border-blue-500 bg-blue-500 py-2  ">
            Sign up
          </Button>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="w-[180px] relative flex pt-1 pb-1 pl-2 pr-4 items-center gap-2 rounded-[20px] bg-[#2A2A2A]">
            <img
              src={Na}
              className="ml-1 mt-1 mb-1 w-[25px] h-[25px] object-cover rounded-2xl  bg-lightgray bg-center bg-cover bg-no-repeat"
            />
            <div className="relative w-[100px] overflow-hidden">
              <p
                className="items-center animate-marquee text-gray-100"
                id="truncate-text">
                {username}
              </p>
            </div>

            <img
              className="absolute right-4"
              src={selectUser}
              onClick={() => {
                setDropdown(!dropdown);
              }}
            />
          </div>
          {dropdown ? (
            <div className="py-2 space-y-2 w-[180px] absolute top-[64px] rounded-lg z-10 bg-[#2A2A2A] text-white">
              <div className="text-center hover:underline hover:bg-slate-500">
                Profile
              </div>
              <div
                onClick={handleLogout}
                className="text-center hover:underline hover:bg-slate-500">
                Log out
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

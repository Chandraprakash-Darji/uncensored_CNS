import React, { useState } from "react";
import { polygonSvg } from "../assets/indexImg";
import { BsPersonCheck } from "react-icons/bs";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const [isMenuOpend, setisMenuOpend] = useState(false);
  const navOptions = ["Github", "About Us", "Donate"];
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  const handleMenuOpened = () => {
    setisMenuOpend((prevState) => {
      setisMenuOpend(!prevState);
    });
  };

  return (
    <>
      {isMenuOpend ? (
        <div className="absolute w-screen h-screen bg-black/70 backdrop-blur  top-0 left-0 z-0"></div>
      ) : (
        ""
      )}
      <header className="shadow-lg z-10 bg-white/50 backdrop-blur fixed w-screen top-0">
        <nav className="container mx-auto flex items-center justify-between px-6 py-2 sm:flex-wrap lg:flex-nowrap">
          <button className="mr-2 sm:hidden" onClick={handleMenuOpened}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <div className="text-lg flex gap-2 justify-center items-center font-bold sm:w-full lg:w-auto">
            <img src={polygonSvg} alt="polygon" className="w-6 h-6" />
            <p>Uncensored CNS</p>
          </div>
          <ul className="gap-4 hidden sm:flex">
            {navOptions.map((option, i) => (
              <li key={`${option}${i}`}>
                <a href="#">{option}</a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ml-5 gap-2"
            onClick={loginWithRedirect}
          >
            {isAuthenticated ? (
              <img
                src={user.picture}
                alt={user.name}
                className="w-7 rounded-full"
              />
            ) : (
              <BsPersonCheck />
            )}
            <span>{isAuthenticated ? user.name : "Login"}</span>
          </button>

          {isMenuOpend ? (
            <div className="absolute top-full left-0 sm:hidden w-full transition-all duration-500 z-10">
              <ul className="flex flex-col justify-center items-center py-4 bg-gray-900 text-gray-50 px-2">
                {navOptions.map((option, i) => (
                  <li
                    key={`${option}${i}`}
                    className="w-full px-2 py-3 border-b-2 border-gray-50/10 hover:bg-gray-50/10 hover:rounded-xl"
                  >
                    <a href="#">{option}</a>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ""
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;

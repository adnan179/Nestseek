import React from "react";
import { UserLogin } from "../components";
import purple from "../assets/purple-bg-3.jpg";

const LoginPage = () => {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center p-10 overflow-hidden">
      {/* inner cont */}
      <div className="flex w-[70vw] h-[70vh] bg-white rounded-lg border shadow-lg shadow-purple-600">
        {/* Register component */}
        <div className="w-[30%] flex">
          <UserLogin />
        </div>
        {/* Image container */}
        <div
          className="w-[70%] relative bg-cover bg-center bg-no-repeat rounded-tl-md rounded-bl-md"
          style={{ backgroundImage: `url(${purple})` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">
              Welcome Back User!!
            </span>
            <span className="text-gray-100 mt-2">
              Login to access your account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

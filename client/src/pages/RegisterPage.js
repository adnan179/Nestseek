import React from "react";
import { UserRegister } from "../components";
import purple from "../assets/purple-bg-3.jpg";

const RegisterPage = () => {
  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center p-10 overflow-hidden">
      <div className="flex w-full h-[90vh] bg-white rounded-lg border shadow-lg shadow-purple-600">
        {/* Register component */}
        <div className="w-1/3 flex justify-center items-center">
          <UserRegister />
        </div>
        {/* Image container */}
        <div
          className="w-2/3 relative bg-cover bg-center bg-no-repeat rounded-tl-md rounded-bl-md"
          style={{ backgroundImage: `url(${purple})` }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-white text-4xl font-bold">Welcome Page</span>
            <span className="text-gray-100 mt-4">Sign up to get started!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

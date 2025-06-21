// PageLoader.jsx

import React from "react";

const PageLoader = ({ title = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-900 to-teal-900">
      <div className="flex flex-col items-center space-y-4">
        {/* Fancy Rotating Circle Spinner with Glow */}
        <div className="w-24 h-24 border-4 border-t-4 border-teal-600 border-t-transparent rounded-full animate-spin-slow bg-transparent mb-6 shadow-xl shadow-teal-400"></div>

        {/* Loading Text with Smooth Fade-in Effect */}
        <p className="text-2xl text-teal-300 font-semibold text-center opacity-90 animate-fadeIn">
          {title}
        </p>
      </div>
    </div>
  );
};

export default PageLoader;

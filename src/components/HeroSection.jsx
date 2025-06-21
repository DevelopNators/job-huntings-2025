import React from 'react';
import SearchBar from './SearchBar';
import { useDispatch, useSelector } from 'react-redux';

const HeroSection = () => {

  return (
    <div className="relative min-h-[80vh] bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-teal-900/50" />
      </div>
      
      <div className="relative pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight oswald ">
            Land the Job You've Been Dreaming Of
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12">
              Browse through thousands of opportunities from top companies and find the perfect role for your career.
            </p>
            
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 transition-all border border-white/20">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
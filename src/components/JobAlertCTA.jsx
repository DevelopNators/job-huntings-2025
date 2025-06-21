import React from 'react';
import { Bell, ArrowRight } from 'lucide-react';

const JobAlertCTA = () => {
  return (
    <section className="py-16 bg-teal-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-teal-800 rounded-xl p-8 md:p-12 shadow-xl relative overflow-hidden">
          {/* Abstract background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 rounded-full -translate-x-1/4 translate-y-1/4" />
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-8 md:mb-0 md:mr-8">
              <div className="flex items-center mb-4">
                <Bell className="w-8 h-8 text-teal-300 mr-3" />
                <h2 className="text-2xl md:text-3xl font-bold">Never Miss a Job Opportunity</h2>
              </div>
              <p className="text-teal-100 mb-6">
                Create personalized job alerts and be the first to know about new positions that match your skills and interests.
              </p>
              
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full md:w-64 px-4 py-3 rounded-l-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-r-lg font-medium transition-colors flex items-center">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <div className="bg-teal-700 rounded-lg p-4 md:p-6 shadow-inner">
                <h3 className="font-semibold mb-2">You'll receive:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="bg-teal-500 rounded-full p-1 mr-2 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-teal-100">Daily or weekly job matches</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-500 rounded-full p-1 mr-2 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-teal-100">Tailored recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-teal-500 rounded-full p-1 mr-2 mt-0.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L10 17L20 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    <span className="text-teal-100">Application deadline reminders</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobAlertCTA;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import { Briefcase } from "lucide-react";
import { bookmarkedJobsAction } from "../store/actions/JobHuntingActions ";

const SavedJobsPage = () => {
  // const savedJobIds = useSelector((state) => state.jobs.bookmarkJobs);
  // const allJobs = useSelector((state) => state.jobs.jobs);
  const savedJobs = useSelector((state) => state.jobhunting.bookmarkJobs);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(bookmarkedJobsAction());
  }, [dispatch]);
  return (
    <div className="min-h-screen  bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold  mb-2">Saved Jobs</h1>
            <p className="text-white-600 mb-8">
              Keep track of positions you're interested in
            </p>

            {savedJobs?.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  No saved jobs yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Start saving jobs you're interested in to keep track of them
                  here
                </p>
                <a
                  href="/jobs"
                  className="inline-block bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
                >
                  Browse Jobs
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedJobs?.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SavedJobsPage;

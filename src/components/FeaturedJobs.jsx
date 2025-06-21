import React, { useEffect } from "react";
import JobCard from "./JobCard";
import { mockJobs } from "../data/mockJobs";
import { useDispatch, useSelector } from "react-redux";
import { getFeaturedAction } from "../store/actions/JobHuntingActions ";

const FeaturedJobs = () => {
  //const featuredJobs = mockJobs.slice(0, 6);
  const featuredJobs = useSelector((state) => state.jobhunting.featuredItems);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedAction(null));
  }, []);
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Job Opportunities
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top positions from leading companies that are hiring right
            now
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))} */}
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/jobs"
            className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            View All Jobs
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedJobs;

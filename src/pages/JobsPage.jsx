import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import { mockJobs } from "../data/mockJobs";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobsAction } from "../store/actions/JobHuntingActions ";

import { Formik, Form, Field } from "formik";
import { Search, MapPin, Briefcase, DollarSign, Filter } from "lucide-react";
import { setPageConfigResetAction } from "../store/actions/PaginationAtion";
import PaginationControl from "../shared/utils/Pagination";
import { JobCategories } from "../enums/Status";
import { FormButtonControl } from "../shared/components/controls/FormControls";

const JobsPage = () => {
  const jobs = useSelector((state) => state.jobhunting.jobs);
  const currPage = useSelector((state) => state.pageConfig.currentPage);
  const recordsPerPage = useSelector((state) => state.pageConfig.itemsPerPage);
  const tableConfig = useSelector((state) => state.pageConfig.recordsConfig);
  const fetchData = (data = {}) => {
    dispatch(
      getAllJobsAction({
        pageNumber: currPage,
        pageSize: recordsPerPage,
        ...data,
      })
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setPageConfigResetAction(null));
    // fetchData();
  }, []);
  const [postTitle, setpostTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedSalary, setSelectedSalary] = useState("");

  // Filter jobs based on selected criteria
  const filteredJobs = mockJobs.filter((job) => {
    return (
      (postTitle === "" ||
        job.title.toLowerCase().includes(postTitle.toLowerCase()) ||
        job.company.toLowerCase().includes(postTitle.toLowerCase()) ||
        job.description.toLowerCase().includes(postTitle.toLowerCase())) &&
      (selectedLocation === "" || job.location.includes(selectedLocation)) &&
      (selectedType === "" || job.type === selectedType) &&
      (selectedSalary === "" || matchesSalaryFilter(job.salary, selectedSalary))
    );
  });

  // Helper function to match salary ranges
  function matchesSalaryFilter(jobSalary, filter) {
    if (filter === "") return true;

    // Extract the lower bound of the job salary
    const match = jobSalary.match(/\$(\d+),(\d+)/);
    if (!match) return false;

    const lowerBound = parseInt(match[1] + match[2]);

    switch (filter) {
      case "Under $70k":
        return lowerBound < 70000;
      case "$70k - $100k":
        return lowerBound >= 70000 && lowerBound <= 100000;
      case "$100k - $130k":
        return lowerBound >= 100000 && lowerBound <= 130000;
      case "$130k+":
        return lowerBound > 130000;
      default:
        return true;
    }
  }

  const locations = [
    "Remote",
    "San Francisco, CA",
    "New York, NY",
    "Seattle, WA",
    "Austin, TX",
  ];
  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"];
  const salaryRanges = [
    "Under 200000",
    "200000 - 600000",
    "200000 - 1600000",
    "2000000+",
  ];

  return (
    <div className="min-h-screen  bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">
              Find Your Perfect Job
            </h1>
            <p className="text-primary-600">
              Browse through {mockJobs.length} opportunities from top companies
            </p>
          </div>
          <JobSearchForm
            locations={locations}
            jobTypes={jobTypes}
            salaryRanges={salaryRanges}
            fetchData={() => fetchData()}
            onSearch={(values, setSubmitting) => {
              fetchData(values);
              setSubmitting(false);
              // setpostTitle(values.postTitle);
              // setSelectedLocation(values.selectedLocation);
              // setSelectedType(values.selectedType);
              // setSelectedSalary(values.selectedSalary);
            }}
          />

          <div className="mb-6 flex justify-between items-center">
            <p className="text-white-600">{filteredJobs.length} jobs found</p>
            <div className="flex items-center">
              <span className="text-white-600 mr-2">Sort by:</span>
              <select className="py-1 px-2 text-gray-900 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm">
                <option>Most Relevant</option>
                <option>Newest</option>
                <option>Highest Salary</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs?.length > 0 ? (
              jobs?.map((job) => <JobCard key={job.id} job={job} />)
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  No jobs found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or browse all available
                  positions.
                </p>
                <button
                  onClick={() => {
                    setpostTitle("");
                    setSelectedLocation("");
                    setSelectedType("");
                    setSelectedSalary("");
                  }}
                  className="text-teal-600 font-medium hover:text-teal-800 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
          <PaginationControl onPageChangeFetch={() => fetchData()} />
          {/* {filteredJobs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-3 py-2 border border-gray-300 bg-white text-white-500 hover:bg-gray-50 rounded-l-md">
                  Previous
                </button>
                <button className="px-3 py-2 border border-gray-300 bg-teal-600 text-white hover:bg-teal-700">
                  1
                </button>
                <button className="px-3 py-2 border border-gray-300 bg-white text-white-500 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 border border-gray-300 bg-white text-white-500 hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-2 border border-gray-300 bg-white text-white-500 hover:bg-gray-50 rounded-r-md">
                  Next
                </button>
              </nav>
            </div>
          )} */}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobsPage;

const JobSearchForm = ({
  locations,
  jobTypes,
  salaryRanges,
  onSearch,
  fetchData,
}) => {
  return (
    <Formik
      initialValues={{
        name: "",
        jobLocation: "",
        selectedType: "",
        salary: "",
      }}
      onSubmit={(values, { setSubmitting }) => {
        // Pass the form values to a parent callback or handle search logic here
        onSearch(values, setSubmitting);
      }}
    >
      {({ resetForm, isSubmitting }) => (
        <Form className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search className="w-5 h-5" />
              </div>
              <Field
                type="text"
                name="name"
                placeholder="Job title, company, or keywords"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                resetForm();
                fetchData();
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Search Jobs
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex flex-wrap gap-6">
              {/* Location */}
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </label>
                <Field
                  as="select"
                  name="jobLocation"
                  className="block w-full py-2 px-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </Field>
              </div>

              {/* Job Type */}
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <Briefcase className="w-4 h-4 mr-1" />
                  Job Type
                </label>
                <Field
                  as="select"
                  name="selectedType"
                  className="block w-full py-2 px-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option disabled selected>
                    All Types
                  </option>
                  {Object.entries(JobCategories).map(([key, value]) => (
                    <option key={key} value={value}>
                      {key}
                    </option>
                  ))}

                  {/* {jobTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))} */}
                </Field>
              </div>

              {/* Salary Range */}
              <div className="w-full sm:w-auto">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  Salary Range
                </label>
                <Field
                  as="select"
                  name="salary"
                  className="block w-full py-2 px-3 border text-gray-900 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="">All Ranges</option>
                  {salaryRanges.map((range) => (
                    <option key={range} value={range}>
                      {range}
                    </option>
                  ))}
                </Field>
              </div>

              {/* More Filters */}
              <div className="w-full sm:w-auto flex items-end">
                <button
                  type="button"
                  className="text-teal-600 font-medium flex items-center py-2 hover:text-teal-800 transition-colors"
                  onClick={() => {
                    // Optional: open modal or dropdown for more filters
                  }}
                >
                  <Filter className="w-4 h-4 mr-1" />
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

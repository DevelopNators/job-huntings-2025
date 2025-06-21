import React, { useState, useEffect, useRef } from "react";
import { Search as SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../store/slices/filtersSlice";
import { Link } from "./Link";
import ImageControl from "./ImageControl";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  // const jobs = useSelector((state) => state.jobs.jobs);
  const searchRef = useRef(null);
  const jobs = useSelector((state) => state.jobhunting.featuredItems);
  const filteredJobs = jobs
  .filter((job) =>
    job?.postTitle.toLowerCase().includes(query.toLowerCase()) ||
    job?.organizationName.toLowerCase().includes(query.toLowerCase()) ||
    job?.job_Description.toLowerCase().includes(query.toLowerCase())
  )
  .slice(0, 5);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (value) => {
    setQuery(value);
    // dispatch(setSearchTerm(value));
    setIsOpen(true);
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl">
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for jobs, companies, or keywords..."
          className="w-full pl-12 pr-4 py-3 rounded-full bg-white/90 border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-gray-900"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
      </div>

      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden z-50">
          {filteredJobs.length > 0 ? (
            <>
              {filteredJobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/jobs/${job?.uniqueId}`}
                  className="block p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-start">
                    <ImageControl
                      src={job?.coverPhoto}
                      alt={job?.postTitle}
                      className="w-12 h-12 rounded object-cover"
                    />

                    <div className="ml-3">
                      <h4 className="font-medium text-gray-900">
                        {job?.postTitle}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {job?.organizationName}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {job?.jobLocation}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              <Link
                href={`/jobs?q=${encodeURIComponent(query)}`}
                className="block p-3 bg-gray-50 text-center text-teal-600 hover:text-teal-800 font-medium"
                onClick={() => setIsOpen(false)}
              >
                View all results
              </Link>
            </>
          ) : (
            <div className="p-4 text-center text-gray-500">
              No results found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

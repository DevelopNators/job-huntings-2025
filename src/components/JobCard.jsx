import React from "react";
import {
  Clock,
  MapPin,
  Briefcase,
  BookmarkPlus,
  DollarSign,
} from "lucide-react";
import { Link } from "./Link";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaveJob } from "../store/slices/jobsSlice";
import ImageControl from "./ImageControl";
import { formatDate, getEnumName } from "../utils/dateFormatter";
import { jobBookmarkAction } from "../store/actions/JobHuntingActions ";
import { JobCategories } from "../enums/Status";

const JobCard = ({ job }) => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const isSaved = savedJobs.includes(job?.id);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <ImageControl
          src={job?.coverPhoto}
          alt={job?.postTitle}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-xl mb-1 line-clamp-1">
            <Link
              href={`/jobs/${job?.uniqueId}`}
              className="hover:text-teal-300 transition-colors"
            >
              {job?.postTitle}
            </Link>
          </h3>
          <p className="text-gray-200">{job?.organizationName}</p>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4 mr-1" />
            {job?.jobLocation || "Unspecified"}
          </span>
          <span className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 mr-1" />
            {getEnumName(JobCategories, job?.categoryId)  || "Category Not Specified"}
          </span>
          <span className="inline-flex items-center text-sm bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
            {/* <DollarSign className="w-4 h-4 mr-1" /> */}
            {job?.salary || "Salary Not Disclosed"}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{job?.short_Description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {job?.tags?.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500">
            Posted {formatDate(job?.createdDate) || ""}
          </span>
          <div className="flex gap-2">
            <button
               onClick={() => {//dispatch(toggleSaveJob(job?.uniqueId));
                dispatch(jobBookmarkAction({jobId:job?.uniqueId}))
              }}
              className={`p-2 rounded-full transition-colors ${
                isSaved
                  ? "text-teal-600 bg-teal-50"
                  : "text-gray-400 hover:text-teal-600 hover:bg-teal-50"
              }`}
              aria-label={isSaved ? "Unsave job" : "Save job"}
            >
              <BookmarkPlus className="w-5 h-5" />
            </button>
            <Link
              href={`/jobs/${job?.uniqueId}`}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

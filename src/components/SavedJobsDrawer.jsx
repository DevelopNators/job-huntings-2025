import React, { useEffect } from 'react';
import { X, Briefcase } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSaveJob } from '../store/slices/jobsSlice';
import { Link } from './Link';
import { bookmarkedJobsAction, jobBookmarkAction } from '../store/actions/JobHuntingActions ';

const SavedJobsDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const savedJobIds = useSelector((state) => state.jobs.bookmarkJobs);
  useEffect(() => {
    if (!isOpen) return;
    dispatch(bookmarkedJobsAction())
  }, [isOpen, dispatch]);
  
  const allJobs = useSelector((state) => state.jobs.jobs);
  // const savedJobs = allJobs.filter(job => savedJobIds.includes(job.id));
  const savedJobs = useSelector((state) => state.jobhunting.bookmarkJobs);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 w-full max-w-md bg-white shadow-xl">
        <div className="h-full flex flex-col">
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Saved Jobs</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {savedJobs?.length === 0 ? (
              <div className="text-center py-8">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No saved jobs yet</p>
                <p className="text-sm text-gray-500 mt-2">
                  Jobs you save will appear here
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedJobs?.map(job => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <Link
                          href={`/jobs/${job?.uniqueId}`}
                          className="font-semibold text-gray-900 hover:text-teal-600 transition-colors"
                        >
                          {job.postTitle || "Untitled Job"}
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">{job?.organizationName}</p>
                        <p className="text-gray-500 text-sm mt-2">{job.jobLocation}</p>
                      </div>
                      <button
                        onClick={() => {dispatch(jobBookmarkAction({jobId:savedJobs?.uniqueId}))//dispatch(toggleSaveJob(job.id));
                        }}
                        className="text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavedJobsDrawer;
import React from 'react';
import { Clock, MapPin, Briefcase, BookmarkPlus, DollarSign } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSaveJob } from '../../store/jobsSlice.js';
import { formatRelativeTime, formatSalaryRange } from '../../../../core/utils/formatters.js';
import { Card, CardContent, CardFooter } from '../../../../shared/components/ui/Card/Card.jsx';
import { Button } from '../../../../shared/components/ui/Button/Button.jsx';
import { Link } from '../../../../shared/components/ui/Link/Link.jsx';

export const JobCard = ({ job, variant = 'default' }) => {
  const dispatch = useDispatch();
  const savedJobs = useSelector((state) => state.jobs.savedJobs);
  const isSaved = savedJobs.includes(job.id);

  const handleSaveJob = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleSaveJob(job.id));
  };

  if (variant === 'compact') {
    return (
      <Card hover className="transition-all duration-300">
        <CardContent padding="md">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link 
                href={`/jobs/${job.id}`}
                className="font-semibold text-gray-900 hover:text-teal-600 transition-colors"
              >
                {job.title}
              </Link>
              <p className="text-gray-600 text-sm mt-1">{job.company}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {job.location}
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {job.type}
                </span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveJob}
              className={isSaved ? 'text-teal-600' : 'text-gray-400'}
            >
              <BookmarkPlus className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card hover className="overflow-hidden transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={job.coverImage || `https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg`}
          alt={job.company}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h3 className="font-bold text-xl mb-1 line-clamp-1">
            <Link 
              href={`/jobs/${job.id}`} 
              className="hover:text-teal-300 transition-colors"
            >
              {job.title}
            </Link>
          </h3>
          <p className="text-gray-200">{job.company}</p>
        </div>
      </div>
      
      <CardContent>
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            <MapPin className="w-4 h-4 mr-1" />
            {job.location}
          </span>
          <span className="inline-flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded-full">
            <Clock className="w-4 h-4 mr-1" />
            {job.type}
          </span>
          <span className="inline-flex items-center text-sm bg-teal-100 text-teal-800 px-3 py-1 rounded-full">
            <DollarSign className="w-4 h-4 mr-1" />
            {formatSalaryRange(job.salary)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.tags?.slice(0, 3).map((tag, index) => (
            <span 
              key={index}
              className="bg-gray-50 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full border border-gray-200"
            >
              {tag}
            </span>
          ))}
          {job.tags?.length > 3 && (
            <span className="text-xs text-gray-500">
              +{job.tags.length - 3} more
            </span>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            Posted {formatRelativeTime(job.postedDate)}
          </span>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveJob}
              className={isSaved ? 'text-teal-600 bg-teal-50' : 'text-gray-400'}
            >
              <BookmarkPlus className="w-5 h-5" />
            </Button>
            <Button size="sm" asChild>
              <Link href={`/jobs/${job.id}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
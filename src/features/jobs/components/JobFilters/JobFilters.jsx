import React from 'react';
import { Search, MapPin, Briefcase, DollarSign, Filter } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../store/jobsSlice.js';
import { APP_CONFIG } from '../../../../config/app.config.js';
import { Input } from '../../../../shared/components/ui/Input/Input.jsx';
import { Button } from '../../../../shared/components/ui/Button/Button.jsx';
import { Card } from '../../../../shared/components/ui/Card/Card.jsx';

export const JobFilters = ({ onFiltersChange }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.jobs.filters);
  
  const { jobTypes, salaryRanges } = APP_CONFIG.business;
  
  const locations = [
    'Remote',
    'San Francisco, CA',
    'New York, NY',
    'Seattle, WA',
    'Austin, TX',
    'Los Angeles, CA',
    'Chicago, IL',
    'Boston, MA',
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    dispatch(setFilters(newFilters));
    onFiltersChange?.(newFilters);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFiltersChange?.(filters);
  };

  const resetFilters = () => {
    const resetFilters = {
      search: '',
      location: '',
      jobType: '',
      salaryRange: null,
      categories: [],
    };
    dispatch(setFilters(resetFilters));
    onFiltersChange?.(resetFilters);
  };

  return (
    <Card>
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Job title, company, or keywords"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
            />
          </div>
          <Button type="submit" className="md:w-auto">
            <Search className="w-5 h-5 mr-2" />
            Search Jobs
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-1" />
              Location
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filters.location}
              onChange={(e) => handleFilterChange('location', e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" />
              Job Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filters.jobType}
              onChange={(e) => handleFilterChange('jobType', e.target.value)}
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Salary Range
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filters.salaryRange?.id || ''}
              onChange={(e) => {
                const range = salaryRanges.find(r => r.id === e.target.value);
                handleFilterChange('salaryRange', range || null);
              }}
            >
              <option value="">All Ranges</option>
              {salaryRanges.map(range => (
                <option key={range.id} value={range.id}>{range.label}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="ghost"
            onClick={resetFilters}
            className="flex items-center"
          >
            <Filter className="w-4 h-4 mr-1" />
            Reset Filters
          </Button>
          
          <div className="text-sm text-gray-500">
            Use filters to narrow down your search
          </div>
        </div>
      </form>
    </Card>
  );
};

export default JobFilters;
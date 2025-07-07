import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { DollarSign, TrendingUp, MapPin, Briefcase, Users, BarChart3, Search, Filter } from 'lucide-react';

const SalaryGuidePage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');

  const salaryData = [
    {
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      experience: 'Entry Level (0-2 years)',
      salary: { min: 95000, max: 130000, median: 112000 },
      growth: '+8.5%',
      demand: 'High'
    },
    {
      role: 'Software Engineer',
      location: 'San Francisco, CA',
      experience: 'Mid Level (3-5 years)',
      salary: { min: 130000, max: 180000, median: 155000 },
      growth: '+12.3%',
      demand: 'Very High'
    },
    {
      role: 'Data Scientist',
      location: 'New York, NY',
      experience: 'Mid Level (3-5 years)',
      salary: { min: 110000, max: 160000, median: 135000 },
      growth: '+15.2%',
      demand: 'High'
    },
    {
      role: 'Product Manager',
      location: 'Seattle, WA',
      experience: 'Senior Level (5+ years)',
      salary: { min: 140000, max: 200000, median: 170000 },
      growth: '+10.7%',
      demand: 'High'
    },
    {
      role: 'UX Designer',
      location: 'Austin, TX',
      experience: 'Mid Level (3-5 years)',
      salary: { min: 75000, max: 110000, median: 92500 },
      growth: '+9.1%',
      demand: 'Medium'
    },
    {
      role: 'DevOps Engineer',
      location: 'Remote',
      experience: 'Senior Level (5+ years)',
      salary: { min: 120000, max: 170000, median: 145000 },
      growth: '+18.4%',
      demand: 'Very High'
    }
  ];

  const topPayingRoles = [
    { role: 'Machine Learning Engineer', salary: 165000, growth: '+22.1%' },
    { role: 'Software Architect', salary: 158000, growth: '+14.8%' },
    { role: 'Data Engineering Manager', salary: 152000, growth: '+19.3%' },
    { role: 'Principal Software Engineer', salary: 148000, growth: '+16.7%' },
    { role: 'Product Manager', salary: 142000, growth: '+13.2%' }
  ];

  const locations = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Austin, TX', 'Remote'];
  const roles = ['All Roles', 'Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer'];
  const experienceLevels = ['All Levels', 'Entry Level (0-2 years)', 'Mid Level (3-5 years)', 'Senior Level (5+ years)'];

  const formatSalary = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getDemandColor = (demand) => {
    switch (demand) {
      case 'Very High': return 'text-green-400 bg-green-400/20';
      case 'High': return 'text-blue-400 bg-blue-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const filteredData = salaryData.filter(item => {
    return (
      (selectedLocation === '' || selectedLocation === 'All Locations' || item.location === selectedLocation) &&
      (selectedRole === '' || selectedRole === 'All Roles' || item.role === selectedRole) &&
      (selectedExperience === '' || selectedExperience === 'All Levels' || item.experience === selectedExperience)
    );
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Salary Guide 2024</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Comprehensive salary data to help you understand market rates and negotiate better compensation
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Salary Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {locations.map(location => (
                      <option key={location} value={location} className="bg-gray-800">
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role} className="bg-gray-800">
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Experience Level</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    {experienceLevels.map(level => (
                      <option key={level} value={level} className="bg-gray-800">
                        {level}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Salary Data Table */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-6">Salary Ranges by Role</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Role</th>
                      <th className="px-6 py-4 text-left font-semibold">Location</th>
                      <th className="px-6 py-4 text-left font-semibold">Experience</th>
                      <th className="px-6 py-4 text-left font-semibold">Salary Range</th>
                      <th className="px-6 py-4 text-left font-semibold">Median</th>
                      <th className="px-6 py-4 text-left font-semibold">Growth</th>
                      <th className="px-6 py-4 text-left font-semibold">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((item, index) => (
                      <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                        <td className="px-6 py-4 font-medium">{item.role}</td>
                        <td className="px-6 py-4 text-gray-300">{item.location}</td>
                        <td className="px-6 py-4 text-gray-300">{item.experience}</td>
                        <td className="px-6 py-4">
                          {formatSalary(item.salary.min)} - {formatSalary(item.salary.max)}
                        </td>
                        <td className="px-6 py-4 font-semibold text-teal-300">
                          {formatSalary(item.salary.median)}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-green-400 flex items-center">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {item.growth}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(item.demand)}`}>
                            {item.demand}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Top Paying Roles */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                Top Paying Roles
              </h3>
              <div className="space-y-4">
                {topPayingRoles.map((role, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="font-medium">{role.role}</p>
                      <p className="text-sm text-gray-300">Median Salary</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-teal-300">{formatSalary(role.salary)}</p>
                      <p className="text-sm text-green-400">{role.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-6">Salary Negotiation Tips</h3>
              <div className="space-y-4">
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium mb-2">Research Market Rates</h4>
                  <p className="text-sm text-gray-300">Use this data to understand your market value and prepare for negotiations.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium mb-2">Consider Total Compensation</h4>
                  <p className="text-sm text-gray-300">Factor in benefits, equity, bonuses, and other perks when evaluating offers.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-lg">
                  <h4 className="font-medium mb-2">Timing Matters</h4>
                  <p className="text-sm text-gray-300">Best times to negotiate are during performance reviews or when taking on new responsibilities.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Market Insights */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-teal-600/20 border border-teal-500 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">2024 Market Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300 mb-2">+14.2%</div>
                  <p className="text-sm">Average salary growth in tech</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300 mb-2">68%</div>
                  <p className="text-sm">Companies offering remote work</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-300 mb-2">$125K</div>
                  <p className="text-sm">Average tech salary nationwide</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SalaryGuidePage;
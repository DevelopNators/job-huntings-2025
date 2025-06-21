import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, MapPin, Users, Briefcase } from 'lucide-react';
import { Link } from '../components/Link';

const companies = [
  {
    id: 'techgiant',
    name: 'TechGiant',
    description: 'Leading software development and cloud solutions provider, specializing in enterprise applications and digital transformation.',
    location: 'San Francisco, CA',
    industry: 'Technology',
    size: '1000-5000',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    coverImage: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    jobCount: 45
  },
  {
    id: 'innovatelabs',
    name: 'InnovateLabs',
    description: 'Research and development focused company working on cutting-edge AI and machine learning solutions.',
    location: 'Boston, MA',
    industry: 'Artificial Intelligence',
    size: '500-1000',
    logo: 'https://images.pexels.com/photos/3182777/pexels-photo-3182777.jpeg',
    coverImage: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    jobCount: 28
  },
  {
    id: 'globaltech',
    name: 'GlobalTech',
    description: 'International technology consulting firm providing innovative solutions to businesses worldwide.',
    location: 'New York, NY',
    industry: 'Consulting',
    size: '5000+',
    logo: 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
    coverImage: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    jobCount: 62
  },
  {
    id: 'futureworks',
    name: 'FutureWorks',
    description: 'Next-generation product development company focused on sustainable and innovative solutions.',
    location: 'Seattle, WA',
    industry: 'Product Development',
    size: '100-500',
    logo: 'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg',
    coverImage: 'https://images.pexels.com/photos/1181403/pexels-photo-1181403.jpeg',
    jobCount: 15
  }
];

const industries = ['All Industries', 'Technology', 'Artificial Intelligence', 'Consulting', 'Product Development'];
const locations = ['All Locations', 'San Francisco, CA', 'Boston, MA', 'New York, NY', 'Seattle, WA'];
const sizes = ['All Sizes', '1-100', '100-500', '500-1000', '1000-5000', '5000+'];

const CompaniesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSize, setSelectedSize] = useState('All Sizes');

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === 'All Industries' || company.industry === selectedIndustry;
    const matchesLocation = selectedLocation === 'All Locations' || company.location === selectedLocation;
    const matchesSize = selectedSize === 'All Sizes' || company.size === selectedSize;

    return matchesSearch && matchesIndustry && matchesLocation && matchesSize;
  });
useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen  bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-primary-900 mb-2">Browse Companies</h1>
            <p className="text-primary-600 mb-8">Discover great places to work</p>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <select
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>

                <select
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCompanies.map(company => (
                <Link
                  key={company.id}
                  href={`/companies/${company.id}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="h-32 relative">
                    <img
                      src={company.coverImage}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 transform translate-y-1/2 left-6">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-4 border-white">
                        <img
                          src={company.logo}
                          alt={`${company.name} logo`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-12 p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{company.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{company.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {company.location}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {company.size} employees
                      </span>
                      <span className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {company.jobCount} open positions
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompaniesPage;
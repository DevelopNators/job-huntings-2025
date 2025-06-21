import React from 'react';
import { Briefcase } from 'lucide-react';
import { Link } from './Link';

const companies = [
  {
    id: 'acmecorp',
    name: 'AcmeCorp',
    description: 'Leading software development and cloud solutions',
    jobCount: 24,
    logo: <Briefcase className="w-10 h-10" />
  },
  {
    id: 'techgiant',
    name: 'TechGiant',
    description: 'Innovative technology solutions for the enterprise',
    jobCount: 18,
    logo: <Briefcase className="w-10 h-10" />
  },
  {
    id: 'innovatelabs',
    name: 'InnovateLabs',
    description: 'Research and development in artificial intelligence',
    jobCount: 12,
    logo: <Briefcase className="w-10 h-10" />
  },
  {
    id: 'futureworks',
    name: 'FutureWorks',
    description: 'Next generation digital product development',
    jobCount: 9,
    logo: <Briefcase className="w-10 h-10" />
  },
  {
    id: 'globaltech',
    name: 'GlobalTech',
    description: 'Enterprise software solutions for global businesses',
    jobCount: 15,
    logo: <Briefcase className="w-10 h-10" />
  }
];

const CompanySection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Companies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover opportunities from leading companies actively hiring on our platform
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {companies.map((company) => (
            <Link key={company.id} href={`/companies/${company.id}`} className="block">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-teal-600 flex-shrink-0">
                    {company.logo}
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-lg text-gray-900">{company.name}</h3>
                    <p className="text-teal-600">{company.jobCount} open positions</p>
                  </div>
                </div>
                <p className="text-gray-600 mt-4">{company.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-sm font-medium text-teal-600 hover:text-teal-800 transition-colors">
                    View Company Profile
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link 
            href="/companies" 
            className="inline-block bg-white text-teal-600 border border-teal-600 font-semibold py-3 px-8 rounded-lg hover:bg-teal-50 transition-colors"
          >
            View All Companies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
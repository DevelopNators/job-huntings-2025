import React from 'react';
import { Code, Briefcase, BarChart as ChartBar, Palette, Users, Globe, ShoppingBag, Book } from 'lucide-react';
import { Link } from './Link';

const categories = [
  {
    id: 'tech',
    name: 'Technology',
    count: 1243,
    icon: <Code />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 'business',
    name: 'Business',
    count: 872,
    icon: <Briefcase />,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    id: 'data',
    name: 'Data Science',
    count: 536,
    icon: <ChartBar />,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 'design',
    name: 'Design',
    count: 432,
    icon: <Palette />,
    color: 'bg-pink-100 text-pink-600'
  },
  {
    id: 'hr',
    name: 'Human Resources',
    count: 395,
    icon: <Users />,
    color: 'bg-yellow-100 text-yellow-600'
  },
  {
    id: 'remote',
    name: 'Remote Jobs',
    count: 1568,
    icon: <Globe />,
    color: 'bg-teal-100 text-teal-600'
  },
  {
    id: 'marketing',
    name: 'Marketing',
    count: 621,
    icon: <ShoppingBag />,
    color: 'bg-red-100 text-red-600'
  },
  {
    id: 'education',
    name: 'Education',
    count: 284,
    icon: <Book />,
    color: 'bg-indigo-100 text-indigo-600'
  }
];

const Categories = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Browse Jobs by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore opportunities across various industries and find the perfect position
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/jobs/category/${category.id}`}>
              <div className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-4`}>
                  {React.cloneElement(category.icon, { size: 24 })}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{category.name}</h3>
                <p className="text-gray-500">{category.count.toLocaleString()} jobs</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
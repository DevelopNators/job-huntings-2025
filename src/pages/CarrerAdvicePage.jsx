import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BookOpen, TrendingUp, Users, Target, Lightbulb, Award, Clock, ArrowRight } from 'lucide-react';

const CareerAdvicePage = () => {
  const articles = [
    {
      id: 1,
      title: 'How to Write a Compelling Resume in 2024',
      excerpt: 'Learn the latest resume trends and techniques that will help you stand out to employers.',
      category: 'Resume Tips',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg',
      tags: ['Resume', 'Job Search', 'Career Tips']
    },
    {
      id: 2,
      title: 'Mastering the Virtual Interview',
      excerpt: 'Essential tips for succeeding in video interviews and making a great impression remotely.',
      category: 'Interview Skills',
      readTime: '7 min read',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg',
      tags: ['Interviews', 'Remote Work', 'Communication']
    },
    {
      id: 3,
      title: 'Negotiating Your Salary: A Complete Guide',
      excerpt: 'Strategies and tactics for negotiating a better salary and benefits package.',
      category: 'Salary Negotiation',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg',
      tags: ['Salary', 'Negotiation', 'Career Growth']
    },
    {
      id: 4,
      title: 'Building Your Professional Network',
      excerpt: 'How to expand your professional network and leverage connections for career opportunities.',
      category: 'Networking',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg',
      tags: ['Networking', 'Professional Development', 'Career Growth']
    },
    {
      id: 5,
      title: 'Transitioning to a New Career Field',
      excerpt: 'Step-by-step guide to successfully changing careers and transferring your skills.',
      category: 'Career Change',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      tags: ['Career Change', 'Skills Transfer', 'Professional Development']
    },
    {
      id: 6,
      title: 'Remote Work Best Practices',
      excerpt: 'Tips for thriving in a remote work environment and maintaining productivity.',
      category: 'Remote Work',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg',
      tags: ['Remote Work', 'Productivity', 'Work-Life Balance']
    }
  ];

  const categories = [
    { name: 'Resume Tips', icon: <BookOpen className="w-5 h-5" />, count: 12 },
    { name: 'Interview Skills', icon: <Users className="w-5 h-5" />, count: 8 },
    { name: 'Career Growth', icon: <TrendingUp className="w-5 h-5" />, count: 15 },
    { name: 'Salary Negotiation', icon: <Target className="w-5 h-5" />, count: 6 },
    { name: 'Networking', icon: <Lightbulb className="w-5 h-5" />, count: 9 },
    { name: 'Professional Development', icon: <Award className="w-5 h-5" />, count: 11 }
  ];
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Career Advice & Resources</h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Expert guidance to help you advance your career, from resume writing to salary negotiation
            </p>
          </div>

          {/* Categories */}
          <div className="max-w-6xl mx-auto mb-12">
            <h2 className="text-2xl font-bold mb-8 text-center">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="text-teal-300 mb-2 flex justify-center">
                    {category.icon}
                  </div>
                  <h3 className="font-medium text-sm mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-300">{category.count} articles</p>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Articles */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Latest Career Advice</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div key={article.id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 cursor-pointer">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-teal-600 text-white text-xs font-medium px-2 py-1 rounded">
                        {article.category}
                      </span>
                      <div className="flex items-center text-gray-300 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {article.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{article.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <button className="text-teal-300 hover:text-teal-100 font-medium text-sm flex items-center">
                      Read More <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-teal-600/20 border border-teal-500 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Stay Updated with Career Tips</h2>
              <p className="text-gray-200 mb-6">
                Get weekly career advice and job market insights delivered to your inbox
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CareerAdvicePage;
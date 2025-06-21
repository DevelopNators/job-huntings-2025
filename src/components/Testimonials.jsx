import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Software Engineer',
    content: 'JobHuntings made my job search incredibly easy. I found my dream position at a tech company within just 2 weeks of using the platform. The job alerts were perfectly tailored to my skills and preferences.',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'UX Designer',
    content: 'The filtering options on JobHuntings are fantastic. I was able to narrow down opportunities by location, salary, and company size which saved me so much time. I received multiple interview requests within days.',
    rating: 5
  },
  {
    id: 3,
    name: 'Jessica Williams',
    title: 'Marketing Manager',
    content: 'After struggling with other job sites, JobHuntings was a breath of fresh air. The interface is clean, job descriptions are comprehensive, and I could easily track my applications. Highly recommended!',
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from job seekers who found their perfect career opportunity through JobHuntings
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="bg-gray-50 rounded-lg p-6 border border-gray-100"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.content}"
              </blockquote>
              <div className="mt-auto">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.title}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/testimonials" 
            className="text-teal-600 hover:text-teal-800 font-medium inline-flex items-center transition-colors"
          >
            Read More Success Stories
            <svg 
              className="w-5 h-5 ml-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
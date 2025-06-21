import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Bell, Plus, Edit2, Trash2 } from 'lucide-react';

const JobAlertsPage = () => {
  const alerts = [
    {
      id: 1,
      title: 'Frontend Developer',
      location: 'Remote',
      frequency: 'Daily',
      keywords: ['React', 'TypeScript', 'Frontend'],
      active: true
    },
    {
      id: 2,
      title: 'UI/UX Designer',
      location: 'San Francisco, CA',
      frequency: 'Weekly',
      keywords: ['Figma', 'UI Design', 'User Research'],
      active: true
    }
  ];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen  bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-primary-900 mb-2">Job Alerts</h1>
                <p className="text-primary-600">Get notified about new positions matching your criteria</p>
              </div>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors">
                <Plus className="w-5 h-5 mr-2" />
                Create Alert
              </button>
            </div>

            {alerts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-900 mb-2">No job alerts set</h2>
                <p className="text-gray-600 mb-6">
                  Create job alerts to get notified when new positions match your interests
                </p>
                <button className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors">
                  Create Your First Alert
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {alerts.map(alert => (
                  <div key={alert.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{alert.title}</h3>
                        <p className="text-gray-600 mb-3">{alert.location} • {alert.frequency} updates</p>
                        <div className="flex flex-wrap gap-2">
                          {alert.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-teal-600 rounded-full hover:bg-gray-100">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobAlertsPage;
import React from 'react';
import { useSelector } from 'react-redux';
import { Briefcase, Eye, Heart, Bell } from 'lucide-react';
import { Card, CardContent } from '../../../../shared/components/ui/Card/Card';

export const ProfileStats = () => {
  const user = useSelector((state) => state.user);
  
  const stats = [
    {
      label: 'Applications',
      value: user.applications?.length || 0,
      icon: Briefcase,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      label: 'Profile Views',
      value: user.profile?.viewCount || 0,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      label: 'Saved Jobs',
      value: user.savedJobs?.length || 0,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      label: 'Job Alerts',
      value: user.jobAlerts?.length || 0,
      icon: Bell,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${stat.bgColor} mr-3`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ProfileStats;
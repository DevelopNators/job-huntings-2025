import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MessageCircle, Send, Instagram } from 'lucide-react';
import { toggleSocialConnection } from '../store/slices/userSlice';

const SocialConnect = () => {
  const dispatch = useDispatch();
  const socialConnections = useSelector((state) => state.user.socialConnections);

  const socialPlatforms = [
    {
      name: 'whatsapp',
      icon: <MessageCircle className="w-6 h-6" />,
      label: 'WhatsApp',
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      link: 'https://wa.me/your-number'
    },
    {
      name: 'telegram',
      icon: <Send className="w-6 h-6" />,
      label: 'Telegram',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      link: 'https://t.me/your-channel'
    },
    {
      name: 'instagram',
      icon: <Instagram className="w-6 h-6" />,
      label: 'Instagram',
      color: 'bg-pink-500',
      hoverColor: 'hover:bg-pink-600',
      link: 'https://instagram.com/your-profile'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
      <div className="space-y-4">
        {socialPlatforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-between p-4 rounded-lg ${platform.color} ${platform.hoverColor} text-white transition-colors cursor-pointer`}
            onClick={(e) => {
              e.preventDefault();
              dispatch(toggleSocialConnection(platform.name));
              window.open(platform.link, '_blank');
            }}
          >
            <div className="flex items-center">
              {platform.icon}
              <span className="ml-3 font-medium">{platform.label}</span>
            </div>
            <span className="text-sm">
              {socialConnections[platform.name] ? 'Connected' : 'Connect'}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialConnect;
import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Mail, 
  MessageCircle,
  Send,
  Instagram,
  Share2,
  Download,
  QrCode
} from 'lucide-react';
import Modal from '../../shared/components/ui/Modal/Modal.jsx';
import Button from '../../shared/components/ui/Button/Button.jsx';
import Input from '../../shared/components/ui/Input/Input.jsx';
import { cn } from '../../shared/utils/classNames.js';

export const ShareDialog = ({ 
  isOpen, 
  onClose, 
  url="https://example.com/job-posting", 
  title="Software Engineer at Example Corp", 
  description="",
  hashtags = [],
  className = '' 
}) => {
  const [copied, setCopied] = useState(false);
  const [customMessage, setCustomMessage] = useState('');

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = hashtags.join(',');

  const shareOptions = [
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
      description: 'Share on Facebook'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`,
      description: 'Share on Twitter'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
      description: 'Share on LinkedIn'
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      description: 'Share on WhatsApp'
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      url: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      description: 'Share on Telegram'
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      url: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
      description: 'Share via Email'
    }
  ];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = (shareUrl) => {
    window.open(shareUrl, '_blank', 'width=600,height=400,scrollbars=yes,resizable=yes');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodedUrl}`;
    window.open(qrUrl, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share this job"
      size="md"
      className={className}
    >
      <div className="space-y-6 max-h-[80vh] overflow-y-auto p-6">
        {/* Job Info Preview */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          <p className="text-xs text-gray-500 mt-2 break-all">{url}</p>
        </div>

        {/* Share Platforms */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Share on social media</h4>
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.name}
                  onClick={() => handleShare(option.url)}
                  className={cn(
                    'flex flex-col items-center p-4 rounded-lg text-white transition-colors',
                    option.color
                  )}
                  title={option.description}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <span className="text-xs font-medium">{option.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Copy Link */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Copy link</h4>
          <div className="flex gap-2">
            <Input
              value={url}
              readOnly
              className="flex-1 text-sm"
            />
            <Button
              onClick={handleCopyLink}
              variant={copied ? 'primary' : 'outline'}
              className="flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Additional Options */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
          {/* Native Share (if supported) */}
          {navigator.share && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleNativeShare}
              className="flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              More options
            </Button>
          )}

          {/* QR Code */}
          <Button
            variant="outline"
            size="sm"
            onClick={generateQRCode}
            className="flex items-center"
          >
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>

          {/* Download as PDF (placeholder) */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Print/PDF
          </Button>
        </div>

        {/* Custom Message */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Add a personal message (optional)</h4>
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Add your thoughts about this job opportunity..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none"
            rows={3}
          />
          {customMessage && (
            <div className="mt-2">
              <Button
                size="sm"
                onClick={() => {
                  const message = `${customMessage}\n\n${title}\n${url}`;
                  const encodedMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
                }}
              >
                Share with message
              </Button>
            </div>
          )}
        </div>

        {/* Analytics Note */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
          <p>💡 Sharing helps other job seekers discover great opportunities and supports the JobHuntings community!</p>
        </div>
      </div>
    </Modal>
  );
};

export default ShareDialog;
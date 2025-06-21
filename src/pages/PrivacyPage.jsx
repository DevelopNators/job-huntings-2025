import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react';

const PrivacyPage = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      icon: <Database className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Personal Information',
          text: 'We collect information you provide directly to us, such as when you create an account, update your profile, apply for jobs, or contact us. This may include your name, email address, phone number, resume, work history, and other professional information.'
        },
        {
          subtitle: 'Usage Information',
          text: 'We automatically collect certain information about your use of our platform, including your IP address, browser type, operating system, referring URLs, access times, and pages viewed.'
        },
        {
          subtitle: 'Cookies and Tracking',
          text: 'We use cookies and similar tracking technologies to collect information about your browsing activities and to provide personalized experiences.'
        }
      ]
    },
    {
      id: 'information-use',
      title: 'How We Use Your Information',
      icon: <Eye className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide, maintain, and improve our services, including matching you with relevant job opportunities and facilitating communication between job seekers and employers.'
        },
        {
          subtitle: 'Communication',
          text: 'We may use your contact information to send you job alerts, platform updates, promotional materials, and other communications related to our services.'
        },
        {
          subtitle: 'Analytics and Improvement',
          text: 'We analyze usage patterns to understand how our platform is used and to improve our services, develop new features, and enhance user experience.'
        }
      ]
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: 'With Employers',
          text: 'When you apply for a job or make your profile visible to employers, we share relevant information from your profile with potential employers to facilitate the hiring process.'
        },
        {
          subtitle: 'Service Providers',
          text: 'We may share your information with third-party service providers who perform services on our behalf, such as hosting, analytics, customer support, and payment processing.'
        },
        {
          subtitle: 'Legal Requirements',
          text: 'We may disclose your information if required by law, regulation, legal process, or governmental request, or to protect our rights, property, or safety.'
        }
      ]
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Security Measures',
          text: 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.'
        },
        {
          subtitle: 'Encryption',
          text: 'We use industry-standard encryption to protect sensitive information during transmission and storage.'
        },
        {
          subtitle: 'Access Controls',
          text: 'We limit access to your personal information to employees and contractors who need it to perform their job functions.'
        }
      ]
    },
    {
      id: 'your-rights',
      title: 'Your Rights and Choices',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Account Management',
          text: 'You can update, correct, or delete your account information at any time by logging into your account settings.'
        },
        {
          subtitle: 'Communication Preferences',
          text: 'You can opt out of promotional emails by following the unsubscribe instructions in those emails or by updating your notification preferences in your account.'
        },
        {
          subtitle: 'Data Portability',
          text: 'You have the right to request a copy of your personal information in a structured, machine-readable format.'
        },
        {
          subtitle: 'Account Deletion',
          text: 'You can request deletion of your account and associated personal information by contacting us or using the account deletion feature in your settings.'
        }
      ]
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Global Operations',
          text: 'JobHuntings operates globally, and your information may be transferred to and processed in countries other than your country of residence.'
        },
        {
          subtitle: 'Safeguards',
          text: 'When we transfer your information internationally, we implement appropriate safeguards to ensure your information receives adequate protection.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />
      
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-4">
              Your privacy is important to us. This Privacy Policy explains how JobHuntings 
              collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-gray-300">
              Last updated: December 2024
            </p>
          </div>

          {/* Table of Contents */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6">Table of Contents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sections.map((section, index) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-center p-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="text-teal-300 mr-3">
                      {section.icon}
                    </div>
                    <span className="font-medium">{section.title}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Privacy Policy Sections */}
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, index) => (
              <div key={section.id} id={section.id} className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
                <div className="flex items-center mb-6">
                  <div className="text-teal-300 mr-4">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-bold">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-xl font-semibold mb-3 text-teal-200">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Important Information */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Additional Information</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Children's Privacy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    JobHuntings is not intended for use by children under the age of 16. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will take steps to delete such information.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Changes to This Policy</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this Privacy Policy periodically.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Contact Us</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                  </p>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300">
                      <strong>Email:</strong> privacy@jobhuntings.com<br />
                      <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105<br />
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* GDPR and CCPA Notice */}
            <div className="bg-teal-600/20 border border-teal-500 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Your Privacy Rights</h2>
              <p className="text-gray-200 leading-relaxed mb-4">
                Depending on your location, you may have additional privacy rights under laws such as the 
                General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA).
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Exercise Your Rights
                </a>
                <a
                  href="/contact"
                  className="border-2 border-teal-500 text-teal-300 hover:bg-teal-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Contact Privacy Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPage;
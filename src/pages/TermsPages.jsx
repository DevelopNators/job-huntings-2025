import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FileText, Users, Shield, AlertTriangle, Scale, Globe } from 'lucide-react';

const TermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <FileText className="w-6 h-6" />,
      content: [
        {
          text: 'By accessing and using JobHuntings ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
          text: 'These Terms of Service ("Terms") govern your use of our website located at jobhuntings.com and any related services provided by JobHuntings, a Developnators company.'
        }
      ]
    },
    {
      id: 'user-accounts',
      title: 'User Accounts',
      icon: <Users className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Account Creation',
          text: 'To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.'
        },
        {
          subtitle: 'Account Security',
          text: 'You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party and to take sole responsibility for any activities or actions under your account.'
        },
        {
          subtitle: 'Account Termination',
          text: 'We reserve the right to terminate or suspend your account at any time, with or without cause, and with or without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties.'
        }
      ]
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      icon: <Shield className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Permitted Uses',
          text: 'You may use our Platform for lawful purposes only. You agree to use the Platform in accordance with all applicable laws, regulations, and these Terms.'
        },
        {
          subtitle: 'Prohibited Activities',
          text: 'You agree not to: (a) use the Platform for any unlawful purpose or to solicit others to perform unlawful acts; (b) violate any international, federal, provincial, or state regulations, rules, or laws; (c) infringe upon or violate our intellectual property rights or the intellectual property rights of others; (d) harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate; (e) submit false or misleading information.'
        },
        {
          subtitle: 'Content Standards',
          text: 'All content you submit must be accurate, lawful, and not infringe on the rights of any third party. You are solely responsible for the content you post on the Platform.'
        }
      ]
    },
    {
      id: 'job-postings',
      title: 'Job Postings and Applications',
      icon: <AlertTriangle className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Employer Responsibilities',
          text: 'Employers are responsible for ensuring that job postings are accurate, lawful, and comply with all applicable employment laws. Employers must not post discriminatory job listings or engage in discriminatory hiring practices.'
        },
        {
          subtitle: 'Job Seeker Responsibilities',
          text: 'Job seekers must provide accurate information in their profiles and applications. Misrepresentation of qualifications, experience, or other information may result in account termination.'
        },
        {
          subtitle: 'Platform Role',
          text: 'JobHuntings serves as a platform to connect job seekers and employers. We do not guarantee employment outcomes and are not responsible for the hiring decisions made by employers or the quality of candidates.'
        }
      ]
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: <Scale className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Platform Content',
          text: 'The Platform and its original content, features, and functionality are and will remain the exclusive property of JobHuntings and its licensors. The Platform is protected by copyright, trademark, and other laws.'
        },
        {
          subtitle: 'User Content',
          text: 'By posting content on the Platform, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and distribute your content in connection with operating and providing the Platform.'
        },
        {
          subtitle: 'Trademark Policy',
          text: 'JobHuntings and related graphics, logos, and service names are trademarks of Developnators. You may not use our trademarks without our prior written consent.'
        }
      ]
    },
    {
      id: 'privacy-data',
      title: 'Privacy and Data Protection',
      icon: <Globe className="w-6 h-6" />,
      content: [
        {
          subtitle: 'Privacy Policy',
          text: 'Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use our Platform. By using our Platform, you agree to the collection and use of information in accordance with our Privacy Policy.'
        },
        {
          subtitle: 'Data Security',
          text: 'We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.'
        },
        {
          subtitle: 'Third-Party Services',
          text: 'Our Platform may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third-party services.'
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-gray-200 leading-relaxed mb-4">
              These terms and conditions outline the rules and regulations for the use of JobHuntings platform.
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

          {/* Terms Sections */}
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
                      {item.subtitle && (
                        <h3 className="text-xl font-semibold mb-3 text-teal-200">
                          {item.subtitle}
                        </h3>
                      )}
                      <p className="text-gray-300 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Additional Legal Terms */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-6">Additional Legal Terms</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Disclaimer of Warranties</h3>
                  <p className="text-gray-300 leading-relaxed">
                    The Platform is provided on an "as is" and "as available" basis. JobHuntings makes no representations or warranties of any kind, express or implied, as to the operation of the Platform or the information, content, materials, or products included on the Platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Limitation of Liability</h3>
                  <p className="text-gray-300 leading-relaxed">
                    JobHuntings will not be liable for any damages of any kind arising from the use of the Platform, including but not limited to direct, indirect, incidental, punitive, and consequential damages.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Indemnification</h3>
                  <p className="text-gray-300 leading-relaxed">
                    You agree to indemnify and hold harmless JobHuntings and its affiliates, officers, agents, and employees from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Governing Law</h3>
                  <p className="text-gray-300 leading-relaxed">
                    These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to its conflict of law provisions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Changes to Terms</h3>
                  <p className="text-gray-300 leading-relaxed">
                    We reserve the right to modify these Terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-teal-200">Contact Information</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-gray-300">
                      <strong>Email:</strong> legal@jobhuntings.com<br />
                      <strong>Address:</strong> 123 Tech Street, San Francisco, CA 94105<br />
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Notice */}
            <div className="bg-teal-600/20 border border-teal-500 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-gray-200 leading-relaxed mb-4">
                By using JobHuntings, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our Platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/jobs"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Start Using JobHuntings
                </a>
                <a
                  href="/contact"
                  className="border-2 border-teal-500 text-teal-300 hover:bg-teal-500 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Have Questions?
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

export default TermsPage;
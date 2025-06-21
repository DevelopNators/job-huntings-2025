import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Briefcase,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      details: "developnators@gmail.com",
      description: "Send us an email and we'll respond within 24 hours",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Monday to Friday, 9AM to 6PM PST",
    },
    // {
    //   icon: <MapPin className="w-6 h-6" />,
    //   title: 'Visit Us',
    //   details: '123 Tech Street, San Francisco, CA 94105',
    //   description: 'Our headquarters in the heart of Silicon Valley'
    // },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Business Hours",
      details: "Mon - Fri: 9AM - 6PM PST",
      description: "We're here to help during business hours",
    },
  ];

  const inquiryTypes = [
    {
      icon: <HelpCircle className="w-5 h-5" />,
      title: "General Support",
      description: "Questions about using JobHuntings",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: "Employer Services",
      description: "Information about posting jobs and hiring",
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Feedback",
      description: "Share your thoughts and suggestions",
    },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    subject: Yup.string().required("Subject is required"),
    inquiryType: Yup.string().required("Please select an inquiry type"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", values);
      setSubmitted(true);
      setSubmitting(false);
      resetForm();

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              Have questions, feedback, or need support? We're here to help you
              succeed in your job search or hiring journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Contact Information</h2>

              <div className="space-y-6 mb-12">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-lg rounded-lg p-6"
                  >
                    <div className="flex items-start">
                      <div className="text-teal-300 mr-4 mt-1">{info.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">
                          {info.title}
                        </h3>
                        <p className="text-lg font-medium text-teal-200 mb-1">
                          {info.details}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {info.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Inquiry Types */}
              <h3 className="text-2xl font-bold mb-6">How Can We Help?</h3>
              <div className="space-y-4">
                {inquiryTypes.map((type, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center">
                      <div className="text-teal-300 mr-3">{type.icon}</div>
                      <div>
                        <h4 className="font-semibold">{type.title}</h4>
                        <p className="text-gray-300 text-sm">
                          {type.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6">Send us a Message</h2>

                {submitted && (
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <Send className="w-5 h-5 text-green-400 mr-2" />
                      <p className="text-green-400 font-medium">
                        Thank you! Your message has been sent successfully.
                        We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    subject: "",
                    inquiryType: "",
                    message: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Name *
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-300"
                            placeholder="Your full name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-red-400 text-sm mt-1"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <Field
                            type="email"
                            name="email"
                            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-300"
                            placeholder="your.email@example.com"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-400 text-sm mt-1"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Field
                          type="text"
                          name="subject"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-300"
                          placeholder="Brief description of your inquiry"
                        />
                        <ErrorMessage
                          name="subject"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Inquiry Type *
                        </label>
                        <Field
                          as="select"
                          name="inquiryType"
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white"
                        >
                          <option value="" className="bg-gray-800">
                            Select inquiry type
                          </option>
                          <option value="general" className="bg-gray-800">
                            General Support
                          </option>
                          <option value="employer" className="bg-gray-800">
                            Employer Services
                          </option>
                          <option value="feedback" className="bg-gray-800">
                            Feedback
                          </option>
                          <option value="technical" className="bg-gray-800">
                            Technical Issue
                          </option>
                          <option value="partnership" className="bg-gray-800">
                            Partnership
                          </option>
                        </Field>
                        <ErrorMessage
                          name="inquiryType"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Message *
                        </label>
                        <Field
                          as="textarea"
                          name="message"
                          rows={5}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-white placeholder-gray-300 resize-none"
                          placeholder="Please provide details about your inquiry..."
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-400 text-sm mt-1"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-teal-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  How do I post a job?
                </h3>
                <p className="text-gray-300">
                  Create an employer account, verify your company, and use our
                  job posting tool to reach thousands of qualified candidates.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Is JobHuntings free for job seekers?
                </h3>
                <p className="text-gray-300">
                  Yes! Job seekers can search, apply, and use all our core
                  features completely free of charge.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  How do I delete my account?
                </h3>
                <p className="text-gray-300">
                  Go to your profile settings and select "Delete Account" in the
                  danger zone section, or contact us for assistance.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Can I get help with my resume?
                </h3>
                <p className="text-gray-300">
                  While we don't provide direct resume services, our platform
                  offers tips and resources to help you optimize your profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;

import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Users, Target, Award, Heart, Globe, Briefcase } from "lucide-react";
import Link from "../components/Link";

const AboutPage = () => {
  const stats = [
    { number: "50,000+", label: "Job Seekers" },
    { number: "5,000+", label: "Companies" },
    { number: "25,000+", label: "Jobs Posted" },
    { number: "15,000+", label: "Successful Hires" },
  ];

  const team = [
    {
      name: "Mohd. Riyan",
      role: "Founder",
      image: "https://ri-yan.web.app/assets/6-BYT0YEIB.png",
      link: "https://mriyan.in",
      bio: "Software engineer turned entrepreneur, passionate about building scalable platforms.",
    },
    {
      name: "Mehruddin Khan",
      role: "Head of Product",
      image: "https://cdn-icons-png.flaticon.com/512/6008/6008788.png",
      bio: "Product strategist focused on creating user-centric experiences in the job market.",
      link: "https://www.linkedin.com/in/mehruddin-khan-729956206/",
    },
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Mission-Driven",
      description:
        "We believe everyone deserves meaningful work that aligns with their goals and values.",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "People-First",
      description:
        "Our platform puts job seekers and employers at the center of everything we do.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Inclusive",
      description:
        "We champion diversity and equal opportunities for all job seekers and companies.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "We strive for the highest quality in our platform, service, and user experience.",
    },
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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About JobHuntings
            </h1>
            <p className="text-xl text-gray-200 leading-relaxed">
              We're on a mission to connect talented individuals with meaningful
              career opportunities, making the job search process more
              efficient, transparent, and rewarding for everyone.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-teal-300 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Story Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12 mb-16">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="space-y-6 text-gray-200 leading-relaxed">
                <p>
                  JobHuntings was born from a simple observation: the job search
                  process was broken. Job seekers were overwhelmed by scattered
                  opportunities, while employers struggled to find the right
                  talent efficiently.
                </p>
                <p>
                  Founded in 2020 by a team of former recruiters and tech
                  professionals, we set out to create a platform that would
                  bridge this gap. Our vision was to build more than just
                  another job board – we wanted to create an ecosystem where
                  careers flourish and companies thrive.
                </p>
                <p>
                  Today, JobHuntings serves thousands of job seekers and
                  companies worldwide, facilitating meaningful connections that
                  drive career growth and business success. We're proud to be
                  part of the Developnators family, continuing our mission to
                  revolutionize how people find and fill great jobs.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center"
                >
                  <div className="text-teal-300 mb-4 flex justify-center">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Link
                  key={index}
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <p className="text-teal-300 mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-teal-600 rounded-xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Join thousands of professionals who have found their dream jobs
              through JobHuntings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/jobs"
                className="bg-white text-teal-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Browse Jobs
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-teal-600 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;

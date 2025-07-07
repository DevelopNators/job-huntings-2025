import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Share2,
  Users,
  Heart,
  Briefcase,
  TrendingUp,
  Globe,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  Network,
  Gift,
  Star,
} from "lucide-react";
import { Link } from "../components/Link";
import AuthModal from "../components/AuthModal";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostJobsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const naigate = useNavigate();

  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const features = [
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Share Opportunities",
      description:
        "Know about a great job opening? Share it with the community and help fellow job seekers discover amazing opportunities.",
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Build Community",
      description:
        "Connect job seekers with opportunities through your network. Be the bridge that helps someone land their dream job.",
      color: "bg-green-100 text-green-600",
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Make a Difference",
      description:
        "Your shared job posting could change someone's life. Help build a supportive community where everyone succeeds together.",
      color: "bg-red-100 text-red-600",
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: "Expand Your Network",
      description:
        "Connect with professionals across industries. Your contributions help you build valuable relationships and expand your network.",
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Free to Post",
      description:
        "Share job opportunities at no cost. Help others while building your professional reputation.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Easy Process",
      description:
        "Our simple wizard guides you through posting in just a few minutes.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Wide Reach",
      description:
        "Your posts reach thousands of active job seekers looking for their next opportunity.",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Community Impact",
      description:
        "Be part of a movement that's changing how people find and share job opportunities.",
    },
  ];

  const stats = [
    {
      number: "10,000+",
      label: "Jobs Shared",
      icon: <Briefcase className="w-6 h-6" />,
    },
    {
      number: "5,000+",
      label: "Community Members",
      icon: <Users className="w-6 h-6" />,
    },
    {
      number: "2,500+",
      label: "Successful Placements",
      icon: <TrendingUp className="w-6 h-6" />,
    },
    {
      number: "50+",
      label: "Countries Reached",
      icon: <Globe className="w-6 h-6" />,
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer",
      content:
        "I shared a job opening from my company and it helped 3 people get interviews. It feels amazing to give back to the community!",
      avatar:
        "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg",
    },
    {
      name: "Michael Chen",
      role: "Product Manager",
      content:
        "Through JobHuntings, I've shared over 15 opportunities. It's rewarding to see people land jobs through connections I've made.",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
    },
    {
      name: "Emily Rodriguez",
      role: "HR Specialist",
      content:
        "This platform makes it so easy to share opportunities. I love how it brings the community together to help each other succeed.",
      avatar:
        "https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg",
    },
  ];
  const handleAuthAction = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="mb-6">
              <div className="inline-flex items-center bg-teal-600/20 border border-teal-500 rounded-full px-4 py-2 mb-6">
                <Gift className="w-5 h-5 mr-2 text-teal-300" />
                <span className="text-teal-300 font-medium">
                  Community Feature
                </span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Share Job Opportunities,
              <span className="text-teal-300"> Change Lives</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed mb-8">
              Know about a great job opening? Share it with our community! Help
              fellow job seekers discover opportunities through your network and
              connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={isAuthenticated ? "/post" : "#"}
                onClick={!isAuthenticated ? handleAuthAction : undefined}
                className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center text-lg"
              >
                <Lightbulb className="w-6 h-6 mr-2" />
                Share a Job Opening
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/jobs"
                className="border-2 border-white text-white hover:bg-white hover:text-teal-900 font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center text-lg"
              >
                Browse Shared Jobs
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-4">
                    <div className="text-teal-300 mb-3 flex justify-center">
                      {stat.icon}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Share Job Opportunities?
              </h2>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto">
                JobHuntings isn't just a job board - it's a community-driven
                platform where professionals help each other discover amazing
                career opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 ${feature.color} rounded-xl flex items-center justify-center mb-6`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-200">
                Simple steps to share opportunities and help others
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4">Know an Opening?</h3>
                <p className="text-gray-300">
                  Heard about a job opening at your company, through your
                  network, or online? That's a perfect opportunity to share!
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4">Post in Minutes</h3>
                <p className="text-gray-300">
                  Use our simple wizard to add job details, requirements, and
                  application instructions. It takes just a few minutes!
                </p>
              </div>

              <div className="text-center">
                <div className="bg-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4">Help Others Succeed</h3>
                <p className="text-gray-300">
                  Watch as job seekers discover and apply for the opportunity
                  you shared. You might just change someone's life!
                </p>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 md:p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Benefits of Sharing
                </h2>
                <p className="text-xl text-gray-200">
                  When you share job opportunities, everyone wins
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-teal-300 mr-4 mt-1">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Community Stories
              </h2>
              <p className="text-xl text-gray-200">
                Hear from community members who are making a difference
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-300">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300 italic">
                    "{testimonial.content}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 text-teal-100">
                Join thousands of professionals who are helping others find
                amazing career opportunities. Your next shared job could change
                someone's life!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href={isAuthenticated ? "/post" : "#"}
                  onClick={!isAuthenticated ? handleAuthAction : undefined}
                  className="bg-white text-teal-600 font-semibold py-4 px-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-lg"
                >
                  <Share2 className="w-6 h-6 mr-2" />
                  Start Sharing Jobs
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold py-4 px-8 rounded-lg transition-colors flex items-center justify-center text-lg"
                >
                  Learn More About Us
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Is it really free to post jobs?
                </h3>
                <p className="text-gray-300">
                  Yes! Sharing job opportunities is completely free. We believe
                  in building a supportive community where everyone helps each
                  other succeed.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  What types of jobs can I share?
                </h3>
                <p className="text-gray-300">
                  Any legitimate job opportunity! Whether it's from your
                  company, a partner organization, or something you found online
                  that others might benefit from.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  Do I need to be a recruiter?
                </h3>
                <p className="text-gray-300">
                  Not at all! Anyone can share job opportunities. You just need
                  to know about an opening and want to help others discover it.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">
                  How do I track applications?
                </h3>
                <p className="text-gray-300">
                  You can see how many people viewed your post, but applications
                  go directly to the hiring company. You're helping connect
                  people, not managing the hiring process.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          if (isAuthenticated) naigate("/post");
          setIsAuthModalOpen(false);
        }}
        dtype="signin"
        onForgotPassword={setIsForgotPasswordModalOpen}
      />
    </div>
  );
};

export default PostJobsPage;

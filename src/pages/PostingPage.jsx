import React, { useEffect, useState } from "react";
import PostJobWizard from "./PostJobWizard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PostingPage = () => {
  const [showTips, setShowTips] = useState(true);
  const toggleTips = () => setShowTips((prev) => !prev);

  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!isAuthenticated) {
    //   navigate("/");
    // }
  }, [isAuthenticated]);

  const tips = [
    {
      title: "Use a Clear Job Title",
      description:
        "Avoid vague titles like 'Ninja Developer'. Be specific and role-focused, e.g., 'Frontend Developer – React.js'.",
    },
    {
      title: "Write a Compelling Summary",
      description:
        "Summarize what makes this job or organization attractive. Keep it short, honest, and benefit-driven.",
    },
    {
      title: "Add Key Details",
      description:
        "Mention qualifications, salary (if possible), and exact role expectations to attract relevant candidates.",
    },
    {
      title: "Be Transparent",
      description:
        "If the job is remote, hybrid, or in-office, state that clearly. Add batch restrictions or experience levels up front.",
    },
    {
      title: "Include a Helpful Description",
      description:
        "Break down job responsibilities, tools, growth opportunities, and team culture in an easy-to-read format.",
    },
    {
      title: "Link Correctly",
      description:
        "Double-check your application link or email. Nothing is worse than a broken application process.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24 transition-all duration-300">
        <div
          className={`grid ${
            showTips ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"
          } gap-4 transition-all duration-300`}
        >
          {/* Tips panel */}
          {showTips && (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 relative transition-all duration-300">
                  <button
                    onClick={toggleTips}
                    className="absolute -right-3 top-6 bg-teal-500 hover:bg-teal-600 rounded-full p-1"
                    aria-label="Hide Tips"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h2 className="text-2xl font-bold mb-4">
                    Tips for a Great Job Post{" "}
                    <span className="text-xs text-gray-300">
                      (BETA (not in working state))
                    </span>
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Follow these best practices to ensure your job post stands
                    out and gets the right attention:
                  </p>
                  <ul className="space-y-4">
                    {tips.map((tip, index) => (
                      <li key={index}>
                        <h3 className="text-teal-300 font-semibold">
                          {index + 1}. {tip.title}
                        </h3>
                        <p className="text-gray-300 text-sm">
                          {tip.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Form panel */}
          <div className="relative transition-all duration-300">
            {!showTips && (
              <button
                onClick={toggleTips}
                className="absolute -left-3 top-0 z-10 bg-teal-500 hover:bg-teal-600 rounded-full p-1"
                aria-label="Show Tips"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            )}
            <PostJobWizard />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostingPage;

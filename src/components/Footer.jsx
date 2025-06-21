import React from "react";
import {
  Briefcase,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Send,
  Youtube,
} from "lucide-react";
import { Link } from "./Link";
import logo from "../assets/logo.png"; // Assuming you have a logo image

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              {/* <Briefcase className="w-6 h-6 mr-2" /> */}
              <img src={logo} className="w-52 h-12 mr-2" alt="" srcSet="" />

              {/* <span className="text-xl font-bold">JobHuntings</span> */}
            </div>
            <p className="text-gray-400 mb-4">
              Find your dream job or the perfect candidate with JobHuntings.
              Part of the Developnators network.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://t.me/+8MXkGVIAqxFlNTY1"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Send size={20} />
              </Link>
              <Link
                href="https://whatsapp.com/channel/0029Vaco9XjGOj9iLZZHDb20"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </Link>
              <Link
                href="https://youtube.com/@DevelopNators?si=04CjqXScAvNW1uHc"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/developnators/"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/developnators"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/jobs"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Saved Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/alerts"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Job Alerts
                </Link>
              </li>
              <li>
                <Link
                  href="/career-advice"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Career Advice
                </Link>
              </li>
              <li>
                <Link
                  href="/salary"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Salary Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/post-job"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Post a Job
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Resources
                </Link>
              </li>
              <li>
                <Link
                  href="/partnerships"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} JobHuntings. A Developnators
            Company. All rights reserved.
          </p>
          <div className="flex items-center">
            <Mail className="w-5 h-5 mr-2 text-gray-400" />
            <Link
              href="mailto:contact@jobhuntings.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              contact@jobhuntings.com
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

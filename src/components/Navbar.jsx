import React, { useState, useEffect } from "react";
import {
  Search,
  Briefcase,
  Bell,
  BookmarkCheck,
  User,
  Menu,
  X,
} from "lucide-react";
import { Link } from "../components/Link";
import { useSelector } from "react-redux";
import AuthModal from "./AuthModal";
import NotificationCenter from "./NotificationCenter";
import SavedJobsDrawer from "./SavedJobsDrawer";
import logo from "../assets/logo.png"; // Assuming you have a logo image
import ForgotPasswordModal from "./ForgotPasswordModal";
import ResetPasswordModal from "./ResetPasswordModal";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [isSavedJobsOpen, setIsSavedJobsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const userProfile = useSelector((state) => state.user.profile);
  const appProfile = useSelector((state) => state.auth.profile);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAuthAction = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled || isMenuOpen
            ? "bg-white shadow-md text-gray-800"
            : "bg-transparent text-white"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                {/* <Briefcase className="w-6 h-6 mr-2" /> */}
                <img src={logo} className="w-52 h-12 mr-2" alt="" srcSet="" />
                {/* <span className="text-xl font-bold">JobHuntings</span> */}
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/jobs"
                className="font-medium hover:text-teal-500 transition-colors"
              >
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className="font-medium hover:text-teal-500 transition-colors"
              >
                Companies
              </Link>
              <Link
                href={isAuthenticated ? "/saved" : "#"}
                onClick={!isAuthenticated ? handleAuthAction : undefined}
                className="font-medium hover:text-teal-500 transition-colors"
              >
                Saved Jobs
              </Link>
              {isAuthenticated && (
                <Link
                  href={isAuthenticated ? "/alerts" : "#"}
                  onClick={!isAuthenticated ? handleAuthAction : undefined}
                  className="font-medium hover:text-teal-500 transition-colors"
                >
                  Job Alerts
                </Link>
              )}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {/* <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button> */}
              <Link
                href={"/jobs"}
                className="font-medium hover:text-teal-500 transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Saved Jobs"
                onClick={() =>
                  isAuthenticated ? null : setIsAuthModalOpen(true)
                }
              >
                <NotificationCenter />
              </button>
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Saved Jobs"
                onClick={() =>
                  isAuthenticated
                    ? setIsSavedJobsOpen(true)
                    : setIsAuthModalOpen(true)
                }
              >
                <BookmarkCheck className="w-5 h-5" />
              </button>

              {isAuthenticated ? (
                <Link
                  href="/profile"
                  className="rounded-full bg-teal-500 text-white p-1"
                  aria-label="User Profile"
                >
                  <img
                    src={
                      appProfile?.profilePhoto ||
                      "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                    }
                    alt={appProfile?.lastName || "User"}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                </Link>
              ) : (
                <button
                  className="rounded-full bg-teal-500 text-white p-2"
                  onClick={() => setIsAuthModalOpen(true)}
                  aria-label="Sign In"
                >
                  <User className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white px-4 py-4 shadow-md text-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/jobs" className="font-medium text-gray-800 py-2">
                Find Jobs
              </Link>
              <Link
                href="/companies"
                className="font-medium text-gray-800 py-2"
              >
                Companies
              </Link>
              <Link
                href={isAuthenticated ? "/saved" : "#"}
                onClick={!isAuthenticated ? handleAuthAction : undefined}
                className="font-medium text-gray-800 py-2"
              >
                Saved Jobs
              </Link>
              <Link
                href={isAuthenticated ? "/alerts" : "#"}
                onClick={!isAuthenticated ? handleAuthAction : undefined}
                className="font-medium text-gray-800 py-2"
              >
                Job Alerts
              </Link>
              {isAuthenticated && (
                <Link
                  href="/profile"
                  className="font-medium text-gray-800 py-2"
                >
                  Profile
                </Link>
              )}
              <div className="flex items-center space-x-4 pt-2 text-gray-800">
                <button
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Search"
                >
                  <Link href="/jobs">
                    <Search className="w-5 h-5" />
                  </Link>
                </button>
                <NotificationCenter />
                <button
                  className="p-2 rounded-full hover:bg-gray-100 text-black-700 "
                  aria-label="Saved Jobs"
                  onClick={() =>
                    isAuthenticated
                      ? setIsSavedJobsOpen(true)
                      : setIsAuthModalOpen(true)
                  }
                >
                  <BookmarkCheck className="w-5 h-5 text-black-700" />
                </button>
                {isAuthenticated ? (
                  <Link
                    href="/profile"
                    className="rounded-full bg-teal-500 text-black p-1"
                    aria-label="User Profile"
                  >
                    <img
                      src={
                        userProfile.avatar ||
                        "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                      }
                      alt={userProfile.name || "User"}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <button
                    className="rounded-full bg-teal-500 text-white p-2"
                    onClick={() => setIsAuthModalOpen(true)}
                    aria-label="Sign In"
                  >
                    <User className="w-5 h-5" />
                  </button>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        dtype="signin"
        onForgotPassword={setIsForgotPasswordModalOpen}
      />
      <ForgotPasswordModal
        isOpen={isForgotPasswordModalOpen}
        onClose={() => setIsForgotPasswordModalOpen(false)}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordModalOpen}
        onClose={() => setIsResetPasswordModalOpen(false)}
      />
      <SavedJobsDrawer
        isOpen={isSavedJobsOpen}
        onClose={() => setIsSavedJobsOpen(false)}
      />
    </>
  );
};

export default Navbar;

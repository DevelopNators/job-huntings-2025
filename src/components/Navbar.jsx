import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Briefcase,
  Bell,
  BookmarkCheck,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false);
  const [isSavedJobsOpen, setIsSavedJobsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null);
  
  const dropdownRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);
  const userProfile = useSelector((state) => state.user.profile);
  const appProfile = useSelector((state) => state.auth.profile);

  // Navigation structure with multi-level dropdowns
  const navigationItems = [
    {
      id: 'jobs',
      label: 'Find Jobs',
      href: '/jobs',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Browse All Jobs',
          href: '/jobs',
          description: 'Search through all available positions'
        },
        {
          label: 'Remote Jobs',
          href: '/jobs?type=remote',
          description: 'Work from anywhere opportunities'
        },
        {
          label: 'Full-time Jobs',
          href: '/jobs?type=full-time',
          description: 'Permanent employment positions'
        },
        {
          label: 'Part-time Jobs',
          href: '/jobs?type=part-time',
          description: 'Flexible working arrangements'
        },
        {
          label: 'Internships',
          href: '/jobs?type=internship',
          description: 'Entry-level learning opportunities'
        },
        {
          label: 'Contract Jobs',
          href: '/jobs?type=contract',
          description: 'Project-based employment'
        }
      ]
    },
    {
      id: 'companies',
      label: 'Companies',
      href: '/companies',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Browse Companies',
          href: '/companies',
          description: 'Explore top employers'
        },
        {
          label: 'Company Reviews',
          href: '/companies/reviews',
          description: 'Read employee experiences'
        },
        {
          label: 'Startup Companies',
          href: '/companies?type=startup',
          description: 'Join innovative startups'
        },
        {
          label: 'Fortune 500',
          href: '/companies?type=fortune500',
          description: 'Large enterprise opportunities'
        }
      ]
    },
    {
      id: 'resources',
      label: 'Resources',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Career Advice',
          href: '/career-advice',
          description: 'Tips and guidance for career growth',
          hasSubDropdown: true,
          subItems: [
            { label: 'Resume Tips', href: '/career-advice/resume' },
            { label: 'Interview Skills', href: '/career-advice/interview' },
            { label: 'Networking', href: '/career-advice/networking' },
            { label: 'Career Change', href: '/career-advice/career-change' }
          ]
        },
        {
          label: 'Salary Guide',
          href: '/salary',
          description: 'Market rates and compensation data'
        },
        {
          label: 'Job Market Insights',
          href: '/insights',
          description: 'Industry trends and analysis'
        },
        {
          label: 'Skills Assessment',
          href: '/skills',
          description: 'Evaluate your professional skills'
        }
      ]
    },
    {
      id: 'employers',
      label: 'For Employers',
      href: '#',
      hasDropdown: true,
      dropdownItems: [
        {
          label: 'Post a Job',
          href: '/post-job',
          description: 'Find the perfect candidate'
        },
        {
          label: 'Pricing Plans',
          href: '/pricing',
          description: 'Choose the right plan for you'
        },
        {
          label: 'Employer Resources',
          href: '/employer-resources',
          description: 'Tools and guides for hiring'
        },
        {
          label: 'Talent Solutions',
          href: '/talent-solutions',
          description: 'Advanced recruitment services'
        }
      ]
    }
  ];

  // User menu items (when authenticated)
  const userMenuItems = [
    {
      label: 'My Profile',
      href: '/profile',
      icon: <User className="w-4 h-4" />
    },
    {
      label: 'Saved Jobs',
      href: '/saved',
      icon: <BookmarkCheck className="w-4 h-4" />
    },
    {
      label: 'Job Alerts',
      href: '/alerts',
      icon: <Bell className="w-4 h-4" />
    },
    {
      label: 'Applications',
      href: '/applications',
      icon: <Briefcase className="w-4 h-4" />
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuthAction = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
    }
  };

  const handleDropdownToggle = (itemId) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const handleMobileDropdownToggle = (itemId) => {
    setActiveMobileDropdown(activeMobileDropdown === itemId ? null : itemId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md text-gray-800"
            : "bg-transparent text-white"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <img src={logo} className="w-52 h-12 mr-2" alt="JobHuntings Logo" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2" ref={dropdownRef}>
              {navigationItems.map((item) => (
                <div key={item.id} className="relative">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => handleDropdownToggle(item.id)}
                      className="flex items-center font-medium hover:text-teal-500 transition-colors px-3 py-2 rounded-lg"
                    >
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="font-medium hover:text-teal-500 transition-colors px-3 py-2 rounded-lg"
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-100 py-2 z-50">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <div key={index} className="relative group">
                          <Link
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{dropdownItem.label}</div>
                                {dropdownItem.description && (
                                  <div className="text-sm text-gray-500 mt-1">
                                    {dropdownItem.description}
                                  </div>
                                )}
                              </div>
                              {dropdownItem.hasSubDropdown && (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              )}
                            </div>
                          </Link>

                          {/* Sub-dropdown */}
                          {dropdownItem.hasSubDropdown && (
                            <div className="absolute left-full top-0 ml-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                              {dropdownItem.subItems.map((subItem, subIndex) => (
                                <Link
                                  key={subIndex}
                                  href={subItem.href}
                                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {subItem.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <NotificationCenter />

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
                <div className="relative group">
                  <button className="rounded-full bg-teal-500 text-white p-1">
                    <img
                      src={
                        appProfile?.profilePhoto ||
                        "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                      }
                      alt={appProfile?.lastName || "User"}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  </button>
                  
                  {/* User Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium text-gray-900">
                        {appProfile?.firstName} {appProfile?.lastName}
                      </div>
                      <div className="text-sm text-gray-500">{appProfile?.email}</div>
                    </div>
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={() => {/* Add logout logic */}}
                        className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-4 max-h-96 overflow-y-auto">
              {/* Mobile Navigation Items */}
              {navigationItems.map((item) => (
                <div key={item.id} className="mb-2">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleMobileDropdownToggle(item.id)}
                        className="flex items-center justify-between w-full font-medium text-gray-800 py-3 px-2 rounded-lg hover:bg-gray-50"
                      >
                        {item.label}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform ${
                            activeMobileDropdown === item.id ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                      
                      {activeMobileDropdown === item.id && (
                        <div className="ml-4 mt-2 space-y-1">
                          {item.dropdownItems.map((dropdownItem, index) => (
                            <div key={index}>
                              <Link
                                href={dropdownItem.href}
                                className="block py-2 px-3 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {dropdownItem.label}
                              </Link>
                              
                              {dropdownItem.hasSubDropdown && (
                                <div className="ml-4 space-y-1">
                                  {dropdownItem.subItems.map((subItem, subIndex) => (
                                    <Link
                                      key={subIndex}
                                      href={subItem.href}
                                      className="block py-1 px-3 text-sm text-gray-500 hover:text-gray-700"
                                      onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                      {subItem.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-medium text-gray-800 py-3 px-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile User Section */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-2 py-2">
                      <img
                        src={
                          appProfile?.profilePhoto ||
                          "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg"
                        }
                        alt={appProfile?.lastName || "User"}
                        className="w-8 h-8 rounded-full object-cover mr-3"
                      />
                      <div>
                        <div className="font-medium text-gray-900">
                          {appProfile?.firstName} {appProfile?.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{appProfile?.email}</div>
                      </div>
                    </div>
                    {userMenuItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-50 rounded"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <button
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                    onClick={() => {
                      setIsAuthModalOpen(true);
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Sign In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
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
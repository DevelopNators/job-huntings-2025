import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { mockJobs } from "../data/mockJobs";
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  BookmarkPlus,
  Share2,
  ExternalLink,
  // WhatsApp,
  Linkedin,
  // Telegram,
  MessageCircle,
  Twitter,
  WheatOff,
  TelescopeIcon,
  Instagram,
  Send,
} from "lucide-react";
import { Link } from "../components/Link";
import { useDispatch, useSelector } from "react-redux";
import {
  getSimilarJobsAction,
  getSingleJobAction,
  jobBookmarkAction,
} from "../store/actions/JobHuntingActions ";
import { useParams } from "react-router-dom";
import ImageControl from "../components/ImageControl";
import { Helmet } from "react-helmet-async";
import PageLoader from "../components/PageLoader";
import { formatDate, getEnumName } from "../utils/dateFormatter";
import ShareDialog from "../components/dialogs/ShareDialog";
import { JobCategories } from "../enums/Status";
import AuthModal from "../components/AuthModal";
import { RichContentControl } from "../shared/components/controls/RichContentControl";

const JobDetailPage = () => {
  const job = useSelector((state) => state.jobhunting.job);
  const similarJobs = useSelector((state) => state.jobhunting.similarItems);
  const isAuthenticated = useSelector((state) => state.token.isAuthenticated);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] =
    useState(false);
  const param = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    // Fetch the job details based on the ID from URL params
    dispatch(getSingleJobAction({ uniqueId: param.id }));
    dispatch(getSimilarJobsAction({ name: job?.organizationName }));
  }, [dispatch, param.id]);
  // const [job, setJob] = useState(singleJob);
  // const [similarJobs, setSimilarJobs] = useState([]);
  const [shareDialog, setShareDialog] = useState(false);

  if (!job) {
    return (
      <PageLoader title="Please wait while we get ready the stuff for you" />
    );
  }

  return (
    <>
      <Helmet>
        <meta property="og:title" content={job?.postTitle} />
        <meta property="title" content={job?.postTitle} />
        <meta
          property="og:description"
          content={job?.short_Description?.slice(0, 150)}
        />
        <meta
          property="description"
          content={job?.short_Description?.slice(0, 150)}
        />

        <meta property="og:image" content={job?.coverPhoto} />
        <meta property="image" content={job?.coverPhoto} />
        <link
          rel="canonical"
          href={`https://jobhuntings.developnators.com/jobs/${job?.id}`}
        />
        <meta
          property="og:url"
          content={`https://jobhuntings.developnators.com/jobs/${job?.id}`}
        />
        <title>{job?.postTitle || "Job Details"}</title>
      </Helmet>
      <div className="min-h-screen  bg-gradient-to-r from-indigo-900 to-teal-900 text-white">
        <Navbar />

        <div className="pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <ImageControl
                  src={job?.coverPhoto}
                  alt={job?.postTitle}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6 md:p-8 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4 mb-4 md:mb-0">
                      <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center text-teal-600 flex-shrink-0">
                        <Briefcase className="w-8 h-8" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-1">
                          {job?.postTitle}
                        </h1>
                        <p className="text-gray-600 text-lg mb-2">
                          {job?.organizationName}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <span className="inline-flex items-center text-sm text-gray-500">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job?.jobLocation}
                          </span>
                          <span className="inline-flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {getEnumName(JobCategories, job?.categoryId) ||
                              "Category Not Specified"}
                          </span>
                          <span className="inline-flex items-center text-sm text-gray-500">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job?.salary}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          isAuthenticated
                            ? dispatch(
                                jobBookmarkAction({ jobId: job?.uniqueId })
                              )
                            : setIsAuthModalOpen(true);
                        }}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <BookmarkPlus className="w-4 h-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setShareDialog(true)}
                        className="text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors flex items-center"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {job?.tags?.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job content */}
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Job Description
                        </h2>
                        <div className="text-gray-700 space-y-4">
                          <p>{job?.short_Description}</p>
                          <p>
                            As a {job?.title} at {job?.company}, you will work
                            in a collaborative environment with talented teams
                            to develop innovative solutions. This role offers
                            competitive compensation, benefits, and growth
                            opportunities.
                          </p>
                        </div>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Responsibilities
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                          <li>
                            Design, develop, and maintain high-quality software
                            solutions
                          </li>
                          <li>
                            Collaborate with cross-functional teams to define
                            and implement new features
                          </li>
                          <li>Write clean, efficient, and maintainable code</li>
                          <li>
                            Participate in code reviews and contribute to
                            engineering best practices
                          </li>
                          <li>Troubleshoot and resolve software defects</li>
                          <li>
                            Stay updated with emerging trends and technologies
                          </li>
                        </ul>
                      </div>

                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Requirements
                        </h2>
                        <p className="text-gray-700 space-y-2">
                          <RichContentControl
                            isRead={true}
                            name=""
                            value={job?.requirements}
                            setFieldValue={() => {}}
                          />
                        </p>

                        {!job?.requirements && (
                          <ul className="list-disc pl-5 text-gray-700 space-y-2">
                            <li>
                              Bachelor's degree in Computer Science or related
                              field
                            </li>
                            <li>
                              3+ years of experience in software development
                            </li>
                            <li>
                              Proficiency in relevant programming languages and
                              frameworks
                            </li>
                            <li>
                              Strong problem-solving skills and attention to
                              detail
                            </li>
                            <li>
                              Excellent communication and teamwork abilities
                            </li>
                            <li>
                              Experience with agile development methodologies
                            </li>
                          </ul>
                        )}
                      </div>

                      <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Benefits
                        </h2>
                        <ul className="list-disc pl-5 text-gray-700 space-y-2">
                          <li>Competitive salary and equity package</li>
                          <li>
                            Comprehensive health, dental, and vision insurance
                          </li>
                          <li>
                            Flexible work arrangements including remote options
                          </li>
                          <li>
                            Professional development and learning opportunities
                          </li>
                          <li>Generous paid time off and parental leave</li>
                          <li>401(k) matching and retirement benefits</li>
                        </ul>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                          Apply Instructions
                        </h2>
                        <p className="text-gray-700 space-y-2">
                        <RichContentControl
                            isRead={true}
                            name=""
                            value={job?.appyInstructions}
                            setFieldValue={() => {}}
                          />
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Job Details
                        </h3>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Employment Type
                            </p>
                            <p className="text-gray-800">
                              {getEnumName(JobCategories, job?.categoryId) ||
                                "Not Specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Salary Range
                            </p>
                            <p className="text-gray-800">{job?.salary}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Location
                            </p>
                            <p className="text-gray-800">{job?.jobLocation}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Posted</p>
                            <p className="text-gray-800">
                              {formatDate(job?.createdDate)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">
                              Company
                            </p>
                            <Link
                              href={`/companies/${job?.organizationName
                                ?.toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="text-teal-600 hover:text-teal-800 transition-colors font-medium"
                            >
                              View Company Profile
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Apply for this job
                        </h3>

                        {job?.appyLinks?.map((link, index) => (
                          <div className="space-y-3 mb-5">
                            <Link
                              key={index}
                              href={link}
                              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition-colors"
                            >
                              <span>Apply now {index + 1}</span>
                              {/* <ExternalLink className="w-4 h-4" /> */}
                            </Link>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 rounded-lg p-6 border border-gray-100 mb-6">
                        <h3 className="font-semibold text-gray-900 mb-4">
                          For the latest updates, follow us
                        </h3>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            job?.telegramLink,
                            job?.linkedInLink,
                            job?.whatsAppGroupLink,
                          ]?.map((link, index) => (
                            <div key={index} className="space-y-3 mb-5">
                              <Link
                                href={link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded transition-colors flex items-center justify-between"
                              >
                                <span className="flex items-center gap-1 justify-center ">
                                  {/* Dynamically add the icons */}
                                  {index === 0 && <Send className="w-5 h-5 " />}
                                  {index === 1 && (
                                    <Linkedin className="w-5 h-5 " />
                                  )}
                                  {index === 2 && (
                                    <MessageCircle className="w-5 h-5 " />
                                  )}
                                  {index === 3 && (
                                    <Twitter className="w-5 h-5 " />
                                  )}
                                  {index === 4 && (
                                    <Instagram className="w-5 h-5 " />
                                  )}
                                </span>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Similar jobs */}
              <div className="mt-10">
                <h2
                  className="text-2xl font-bold text-white
              -900 mb-6"
                >
                  Similar Jobs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarJobs.map((job) => (
                    <div
                      key={job?.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-300"
                    >
                      <h3 className="font-bold text-lg text-gray-900 hover:text-teal-600 transition-colors">
                        <Link href={`/jobs/${job?.uniqueId}`}>
                          {job?.postTitle}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {job?.organizationName}
                      </p>

                      <div className="flex flex-wrap gap-3 mt-3">
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          {job?.jobLocation}
                        </span>
                        <span className="inline-flex items-center text-xs text-gray-500">
                          <DollarSign className="w-3 h-3 mr-1" />
                          {job?.salary}
                        </span>
                      </div>

                      <p className="text-gray-600 mt-3 text-sm line-clamp-2">
                        {job?.short_Description || "No description available."}
                      </p>

                      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Posted {formatDate(job?.createdDate)}
                        </span>
                        <Link
                          href={`/jobs/${job?.uniqueId}`}
                          className="text-teal-600 hover:text-teal-800 font-medium text-sm transition-colors"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ShareDialog
          title={job?.postTitle || "Share this job"}
          isOpen={shareDialog}
          url={
            window?.location?.href || "https://jobhuntings.developnators.com"
          }
          onClose={() => setShareDialog(false)}
        />
        <Footer />
      </div>
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        dtype="signin"
        onForgotPassword={setIsForgotPasswordModalOpen}
      />
    </>
  );
};

export default JobDetailPage;

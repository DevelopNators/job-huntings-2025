import JobsPage from "../pages/JobsPage";
import JobDetailPage from "../pages/JobDetailPage";
import SavedJobsPage from "../pages/SavedJobsPage";
import JobAlertsPage from "../pages/JobAlertsPage";
import CompaniesPage from "../pages/CompaniesPage";
import ProfilePage from "../pages/ProfilePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import PrivacyPage from "../pages/PrivacyPage";
import TermsPage from "../pages/TermsPages";
import CareerAdvicePage from "../pages/CarrerAdvicePage";
import SalaryGuidePage from "../pages/SalaryGuidePage";
import PostJobsPage from "../pages/PostJobsPage";
import PostingPage from "../pages/PostingPage";
import ManagePosts from "../pages/ManagePosts";
import HomePage from "../pages/HomePage";

export const routesConfig = [
  { path: "/", element: <HomePage /> },
  { path: "/jobs", element: <JobsPage /> },
  { path: "/jobs/:id", element: <JobDetailPage /> },
  { path: "/saved", element: <SavedJobsPage />, isPrivate: true },
  { path: "/alerts", element: <JobAlertsPage /> },
  { path: "/companies", element: <CompaniesPage /> },
  { path: "/profile", element: <ProfilePage />, isPrivate: true },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/career-advice", element: <CareerAdvicePage /> },
  { path: "/salary", element: <SalaryGuidePage /> },
  { path: "/post-job", element: <PostJobsPage /> },
  { path: "/post", element: <PostingPage />, isPrivate: true },
  { path: "/manage-post", element: <ManagePosts />, isPrivate: true },
];

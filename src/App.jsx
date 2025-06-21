import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import SavedJobsPage from "./pages/SavedJobsPage";
import JobAlertsPage from "./pages/JobAlertsPage";
import CompaniesPage from "./pages/CompaniesPage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch, useSelector } from "react-redux";
import { setDecodedData } from "./store/actions/TokenAction";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPages";
import PushNotificationService from "./services/PushNotificationService";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(setDecodedData()); // Check token status on app load
    PushNotificationService.initialize();
    const unsubscribeForeground = PushNotificationService.startListening(
      dispatch,
      null
    );
    return () => {
      unsubscribeForeground();
    };
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/saved" element={<SavedJobsPage />} />
        <Route path="/alerts" element={<JobAlertsPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

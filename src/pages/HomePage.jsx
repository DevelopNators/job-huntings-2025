import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedJobs from '../components/FeaturedJobs';
import Categories from '../components/Categories';
import CompanySection from '../components/CompanySection';
import JobAlertCTA from '../components/JobAlertCTA';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import { useDispatch } from 'react-redux';
import { getJobCategoryAction } from '../store/actions/JobHuntingActions ';

const HomePage = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    window.scrollTo(0, 0);
    dispatch(getJobCategoryAction(null))
  },[])
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedJobs />
        <Categories />
        <CompanySection />
        <JobAlertCTA />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
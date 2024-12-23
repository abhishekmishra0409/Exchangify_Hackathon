import React from 'react'
import Header from './Common/Header.jsx'
import HeroSection from './LandingPageSections/HeroSection'
import WelcomeSection from './LandingPageSections/WelcomeSection'
import ExpertiseSection from './LandingPageSections/ExpertiseSection'
import CollaborationSection from './LandingPageSections/CollaborationSection'
import SkillExchangeSection from './LandingPageSections/SkillExchangeSection'
import WhySection from './LandingPageSections/WhySection'
import Footer from './Common/Footer.jsx'
const LandingPage = () => {
  return (
    <>
         <Header/>
      <HeroSection/>
        <WelcomeSection/>
      <ExpertiseSection/>
        <CollaborationSection/>
        <SkillExchangeSection/>
        <WhySection />
        <Footer />
    </>
  )
}

export default LandingPage

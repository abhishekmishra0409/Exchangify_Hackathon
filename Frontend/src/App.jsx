import './App.css'
import Header from "./Components/Header.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import WelcomeSection from "./Components/WelcomeSection.jsx";
import ExpertiseSection from "./Components/ExpertiseSection.jsx";
import CollaborationSection from "./Components/CollaborationSection.jsx";
import SkillExchangeSection from "./Components/SkillExchangeSection.jsx";

function App() {


  return (
    <>
  <Header/>
      <HeroSection/>
        <WelcomeSection/>
      <ExpertiseSection/>
        <CollaborationSection/>
        <SkillExchangeSection/>
    </>
  )
}

export default App

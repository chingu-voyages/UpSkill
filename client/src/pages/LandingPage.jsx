import Hero from "../components/Hero";
import HeroLarge from "../components/HeroLarge";
import Community from "../components/Community";
import HowItWorks from "../components/HowItWorks";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const LandingPage = () => {
  const [screen, setScreen] = useState(window.innerWidth);
  useEffect(() => {
    function switchHero() {
      setScreen(() => window.innerWidth);
    }
    window.addEventListener("resize", switchHero);
    return () => {
      window.removeEventListener("resize", switchHero);
    };
  }, [screen]);
  return (
    <div>
      {screen < 770 ? <Hero /> : <HeroLarge />}
      <Community />
      <HowItWorks />
      <Cards />
    </div>
  );
};

export default LandingPage;

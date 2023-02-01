import Hero from "../components/Hero";
import HeroLarge from "../components/HeroLarge";
import Community from "../components/Community";
import HowItWorks from "../components/HowItWorks";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";

const LandingPage = () => {
  const [smallscreen, setSmallscreen] = useState(false);
  useEffect(() => {
    function switchHero() {
      console.log("switched");
      window.innerWidth > 770 ? setSmallscreen(false) : setSmallscreen(true);
    }
    window.addEventListener("resize", switchHero);
    return () => {
      window.removeEventListener("resize", switchHero);
    };
  }, []);
  return (
    <div>
      {smallscreen ? <Hero /> : <HeroLarge />}
      <Community />
      <HowItWorks />
      <Cards />
    </div>
  );
};

export default LandingPage;

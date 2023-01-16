import React from "react";
import Hero from "../components/Hero";
import HeroLarge from "../components/HeroLarge";
import Community from "../components/Community";
import HowItWorks from "../components/HowItWorks";
import { useEffect } from "react";
import Cards from "../components/Cards";

const LandingPage = () => {
  let smallScreen = true;
  useEffect(
    () => {
      function switchHero() {
        window.innerWidth > 770 ? (smallScreen = false) : true;
      }
      window.addEventListener("resize", switchHero);
      return () => {
        window.removeEventListener("resize", switchHero);
      };
    },
    [ window.innerWidth ]
  );
  return (
    <div>
      {smallScreen ? <Hero /> : <HeroLarge />}
      <Community />
      <HowItWorks />
      <Cards />
    </div>
  );
};

export default LandingPage;

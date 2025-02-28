import React from "react";
import {
  HeroSection,
  FeaturesSection,
  TrustedSection,
  FinalCTASection,
} from "./";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar fixed="true" />
      <HeroSection />
      <FeaturesSection />
      <TrustedSection />
      <FinalCTASection />
      <Footer />
    </>
  );
};

export default Home;

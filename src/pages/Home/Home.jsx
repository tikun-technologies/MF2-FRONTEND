import React from "react";
import {
  HeroSection,
  FeaturesSection,
  TrustedSection,
  FinalCTASection,
  ArticlesSection,
} from "./";
import Footer from "../../components/common/Footer/Footer";
import Navbar from "../../components/common/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar fixed="true" />
      <HeroSection />
      <FeaturesSection />
      <ArticlesSection />

      <TrustedSection />
      <FinalCTASection />
      <Footer />
    </>
  );
};

export default Home;

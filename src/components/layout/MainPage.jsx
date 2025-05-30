import { Routes, Route } from "react-router-dom";
import React from "react";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import LandingPage from "../pages/LandingPage/LandingPage";
const MainPage = () => {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/product/:id" element={<DetailPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};
export default MainPage;

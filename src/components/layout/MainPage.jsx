import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import LandingPage from "../pages/LandingPage/LandingPage";
import AddProduct from "../admin/AddProduct";
const MainPage = () => {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          {import.meta.env.VITE_SHOW_ADMIN === "true" && (
            <Route path="/add-product" element={<AddProduct />} />
          )}
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

import { Routes, Route } from "react-router-dom";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import LandingPage from "../pages/LandingPage/LandingPage";
import AddProduct from "../admin/AddProduct";
import AdminControlCenter from "../admin/ControlCenter";
import EditProduct from "../admin/EditProduct";
const MainPage = () => {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          {import.meta.env.VITE_SHOW_ADMIN === "true" && (
            <>
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/admin" element={<AdminControlCenter />} />
            </>
          )}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/admin" element={<AdminControlCenter />} /> */}
          <Route path="/edit-product/:id" element={<EditProduct />} />
          {/* <Route path="/about" element={<AboutPage />} /> */}
          {/* <Route path="/product/:id" element={<DetailPage />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
};
export default MainPage;

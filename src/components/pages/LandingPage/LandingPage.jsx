import { Box } from "@mui/material";
import Hero from "./Hero/Hero";
import Category from "./Category/Category";
import FeaturedSections from "./FeaturedSections/FeaturedSections";
import MissionSection from "./MissionSection/MissionSection";
import Favorites from "./CustomerFavorites/Favorites";
import ProductShowcase from "./ProductShowcase/ProductShowcase";
import HolidayGiftPicks from "./HolidayGiftPicks/HolidayGiftPicks";
import SocialFeed from "./SocialFeed/SocialFeed";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../../redux";
const LandingPage = () => {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [dispatch, token, user]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#ffffff",
      }}
    >
      <Hero />

      <Category />

      <FeaturedSections />

      <MissionSection />

      <Favorites />

      <ProductShowcase />

      <HolidayGiftPicks />

      <SocialFeed />
    </Box>
  );
};

export default LandingPage;

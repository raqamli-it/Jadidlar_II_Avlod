import React, { useEffect, useState } from "react";
import KorEshit from "../components/KorEshit";
import Havolalar from "../components/Havolalar";
import LandingCarousel from "../components/LandingCarousel";
import CardCarousel from "../components/CardCarousel";
import Loading from "../components/components/Loading";
import News from "../components/News";
import HomeTab from "../components/HomeTab";
import HomeTabManba from "../components/HomeTabManba";
import HomeTabIzlanish from "../components/HomeTabIzlanish";
import HomeTabTurkiston from "../components/HomeTabTurkiston";
import HomeKoruvlar from "../components/Home/HomeKoruvlar";
import HomeGallery from "../components/Home/HomGallery";
import Spinner from "../components/components/Spinner";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Slider from "../components/Slider";

export default function Home() {
  const { t } = useTranslation();
  const lang = useSelector((state) => state.langReducer.value);
  useEffect(() => {
    document.title = `JADIDLAR | ${t("jadidlar_")}`;
  }, [lang]);

  return (
    <div>
      <>
        {/* slider optimallashtirildi  */}
        <Slider />
        <div className="container_full">
          {/* nesw optimallashtirildi */}
          <News />
          {/* cardCarusel optimallashtirildi */}
          <CardCarousel />
          {/* Home Tab Manba optimallashtirildi */}
          <HomeTabManba />
          {/* Home Tab Izlanish optimallashtirildi */}
          <HomeTabIzlanish />
          {/* HomeTab optimallashtirildi  */}
          {/* tekshir */}
          <HomeTab />
          {/* Home Tab Turkiston optimallashtirildi */}
          <HomeTabTurkiston />
          {/* Home eshit optimallashtirildi */}
          <KorEshit />
          {/* Havolalar optimallashtirildi  */}
          <Havolalar />
        </div>
      </>
    </div>
  );
}

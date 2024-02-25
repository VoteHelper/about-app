import EventBanner from "../../pageTemplates/home/EventBanner";

import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Slide from "../../components/layout/PageSlide";
import { getUrlWithLocationAndDate } from "../../helpers/urlHelpers";
import HomeCategoryNav from "../../pageTemplates/home/HomeCategoryNav";
import HomeGatherSection from "../../pageTemplates/home/HomeGatherSection";
import HomeHeader from "../../pageTemplates/home/homeHeader/HomeHeader";
import HomeInitialSetting from "../../pageTemplates/home/HomeInitialSetting";
import HomeLocationBar from "../../pageTemplates/home/HomeLocationBar";

import HomeReviewSection from "../../pageTemplates/home/HomeReviewSection";
import HomeStudySection from "../../pageTemplates/home/HomeStudySection";
import HomeWinRecordSection from "../../pageTemplates/home/HomeWinRecordSection";
import StudyController from "../../pageTemplates/home/studyController/StudyController";
import { LocationEn } from "../../types/serviceTypes/locationTypes";

function Home() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const locationParam = searchParams.get("location") as LocationEn;
  const dateParam = searchParams.get("date");

  useEffect(() => {
    if (session?.user && (!locationParam || !dateParam)) {
      const initialUrl = getUrlWithLocationAndDate(
        locationParam,
        dateParam,
        session.user.location
      );
      router.replace(initialUrl);
    }
  });

  return (
    <>
      <HomeInitialSetting />
      <HomeHeader />
      <Slide>
        <HomeCategoryNav />
        <HomeLocationBar />
        <StudyController />
        <HomeStudySection />
        <EventBanner />
        <HomeGatherSection />
        <HomeReviewSection />
        <HomeWinRecordSection />
      </Slide>
    </>
  );
}

export default Home;

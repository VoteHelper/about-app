import { useState } from "react";

import Slide from "../../components/layouts/PageSlide";
import { useGatherQuery } from "../../hooks/gather/queries";
import HomeGatherSection from "../../pageTemplates/home/HomeGatherCol";
import HomeHeader from "../../pageTemplates/home/homeHeader/HomeHeader";
import HomeInitialSetting from "../../pageTemplates/home/HomeInitialSetting";
import HomeStudySection from "../../pageTemplates/home/HomeStudySection";
import HomeCategoryNav from "../../pageTemplates/home/HomeTab";
import EventBanner from "../../pageTemplates/home/study/EventBanner";
import HomeLocationBar from "../../pageTemplates/home/study/HomeLocationBar";

function Home() {
  const [tab, setTab] = useState<"스터디" | "모임">("스터디");

  useGatherQuery();

  return (
    <>
      <HomeInitialSetting />
      <HomeHeader />
      <Slide>
        <HomeCategoryNav tab={tab} setTab={setTab} />
      </Slide>
      <>
        <EventBanner />
        {tab === "스터디" ? (
          <>
            <Slide>
              <HomeLocationBar />
            </Slide>
            <HomeStudySection />
          </>
        ) : (
          <Slide>
            <HomeGatherSection />
          </Slide>
        )}
      </>
    </>
  );
}

export default Home;

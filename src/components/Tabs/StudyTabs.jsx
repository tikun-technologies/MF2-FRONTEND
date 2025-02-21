import * as Tabs from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";
import { useFilter } from "../../context/FilterContext";

import React, { useEffect } from "react";
import TabsContent from "./TabsContent";

const StudyTabs = ({ study }) => {
  // console.log("Received from study detail:", study);
  const { studyData } = study || {};
  const { activeFilter, activeVisualization } = useFilter();

  useEffect(() => {
    console.log("Current Active Filter:", activeFilter);
    console.log("Current Active Visualization:", activeVisualization);
    // console.log()
  }, [activeFilter, activeVisualization]);

  // If studyData is still loading
  if (!studyData) {
    return <p>Loading study data ...</p>;
  }

  return (
    <Tabs.Root defaultValue="overall" className={styles.tabsContainer}>
      <Tabs.List className={styles.tabsList}>
        <Tabs.Trigger value="overall" className={styles.tabTrigger}>
          Overall
        </Tabs.Trigger>
        <Tabs.Trigger value="age" className={styles.tabTrigger}>
          Age
        </Tabs.Trigger>
        <Tabs.Trigger value="gender" className={styles.tabTrigger}>
          Gender
        </Tabs.Trigger>
        <Tabs.Trigger value="prelim" className={styles.tabTrigger}>
          Prelim
        </Tabs.Trigger>
        <Tabs.Trigger value="2 market segments" className={styles.tabTrigger}>
          2 Market Segments
        </Tabs.Trigger>
        <Tabs.Trigger value="3 market segments" className={styles.tabTrigger}>
          3 Market Segments
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="overall" className={styles.tabContent}>
        <TabsContent
          tab="overall"
          topDown={studyData["(T) Overall"]}
          bottomDown={studyData["(B) Overall"]}
          responseTime={studyData["(R) Overall"]}
        />
      </Tabs.Content>
      <Tabs.Content value="age" className={styles.tabContent}>
        <TabsContent
          tab="Age Segments"
          topDown={studyData["(T) Age segments"]}
          bottomDown={studyData["(B) Age segments"]}
          responseTime={studyData["(R) Age segments"]}
        />
      </Tabs.Content>
      <Tabs.Content value="gender" className={styles.tabContent}>
        <TabsContent
          tab="Gender Segments"
          topDown={studyData["(T) Gender segments"]}
          bottomDown={studyData["(B) Gender segments"]}
          responseTime={studyData["(R) Gender segments"]}
        />
      </Tabs.Content>
      <Tabs.Content value="prelim" className={styles.tabContent}>
        <TabsContent 
        tab="Prelim-Answer Segments"
        topDown={studyData["(T) Prelim-answer segments"]}
        bottomDown={studyData["(B) Prelim-answer segments"]}
        responseTime={studyData["(R) Prelim-answer segments"]} />
      </Tabs.Content>
      <Tabs.Content value="2 market segments" className={styles.tabContent}>
        <TabsContent
          tab="2Mindsets"
          topDown={studyData["(T) Mindsets"]}
          bottomDown={studyData["(B) Mindsets"]}
          responseTime={studyData["(R) Mindsets"]}
        />
      </Tabs.Content>
      <Tabs.Content value="3 market segments" className={styles.tabContent}>
        <TabsContent
          tab="3Mindsets"
          topDown={studyData["(T) Mindsets"]}
          bottomDown={studyData["(B) Mindsets"]}
          responseTime={studyData["(R) Mindsets"]}
        />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default StudyTabs;

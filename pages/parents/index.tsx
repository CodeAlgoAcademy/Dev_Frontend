import BarChart from "@/components/parents/UI/BarChart";
import ContentBox from "@/components/parents/UI/ContentBox";
import RecentInteraction from "@/components/parents/multiplayer/RecentInteraction";
import ParentLayout from "@/components/layouts/ParentLayout";
import ProgressBar from "@/components/parents/UI/ProgressBar";
import SkillBox from "@/components/parents/student/SkillBox";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChildren, getChildProgress, getChildSkills } from "store/parentChildSlice";
import { RootState } from "store/store";
import { IParentChild, screentimeTypes } from "types/interfaces";
import Skills from "@/components/parents/student/Skills";

const Dashboard = () => {
   const dispatch = useDispatch();
   const parent = useSelector((state: RootState) => state.parentChild);

   const [timeLimits, setTimeLimits] = useState<screentimeTypes[]>([
      { id: 1, dayOfTheWeek: "Monday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Tuesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Wednesday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Thursday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Friday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Saturday", timeLimit: 0 },
      { id: 1, dayOfTheWeek: "Sunday", timeLimit: 0 },
   ]);

   const changeTimeLimit = (currentChild: IParentChild) => {
      return currentChild?.timeLimits?.map((time) => {
         let currentTime = { ...time };
         if (time.timeLimit === "12:00:00") {
            currentTime.timeLimit = "No Limit";
         } else {
            currentTime.timeLimit = parseInt((time.timeLimit as string).split(":")[0]);
         }
         return currentTime;
      });
   };

   useEffect(() => {
      dispatch(getChildren());
   }, []);

   useEffect(() => {
      if (parent?.currentChild) {
         setTimeLimits(changeTimeLimit(parent?.currentChild));
      }
   }, [parent?.currentChild, parent?.currentChild?.timeLimits]);

   useEffect(() => {
      if (parent?.currentChild?.id) {
         dispatch(getChildProgress());
      }
   }, [parent.currentChild.id]);

   return (
      <ParentLayout>
         <div className="relative bottom-14 mb-[-120px] scale-90 overflow-x-auto sm:bottom-0 sm:mb-0 sm:scale-100">
            <div className=" mb-6 grid max-w-fit grid-cols-1 justify-center gap-x-6 gap-y-8 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
               <ContentBox size="base" title="Level" padding="small">
                  <h2 className="mt-14 text-center text-[22px] font-medium"></h2>
                  <React.Fragment>
                     <div className="mt-6 ml-4">
                        <ProgressBar
                           color="red"
                           percentage={Number(parent?.currentChild?.progress?.current?.progress) || 0}
                           title={parent?.currentChild?.progress?.current?.title}
                           titleSize="base"
                        />
                        <div className="mt-8">
                           <h3 className="font-semibold">Comprehension Tracking</h3>
                           <div className="small-scroll-thumb blue-scroll-thumb mt-3 flex h-[70px] flex-col gap-5 overflow-y-auto pr-4">
                              {parent.currentChild.progress?.topic?.map((lesson: any, index: number) => (
                                 <ProgressBar key={index} color="green" percentage={lesson?.progress} title={lesson?.title} titleSize="small" />
                              ))}
                           </div>
                        </div>
                     </div>
                  </React.Fragment>
                  {/* ))} */}
               </ContentBox>
               <Skills size="base" />
               <ContentBox size="base" title="Screen Time" padding="large" showSublink={true} link="parents/screen-time">
                  <BarChart
                     data={timeLimits?.map((time) => {
                        return time.timeLimit === "No Limit" ? 8 : (time.timeLimit as number);
                     })}
                     barSpace={9.6}
                     barWidth={3.3}
                     maxHours={8}
                  />
               </ContentBox>
               <ContentBox size="base" title="Multiplayer" padding="large" showSublink={true} link="parents/multiplayer">
                  <RecentInteraction />
               </ContentBox>
            </div>
         </div>
      </ParentLayout>
   );
};

export default Dashboard;

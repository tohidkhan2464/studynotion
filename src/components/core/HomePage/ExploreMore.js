import React, { useState } from "react";
import {HomePageExplore} from '../../../data/homepage-explore'; 
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
    "Free",
    "New to Coding",
    "Most Popular",
    "Skills Paths",
    "Career Paths",
]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {

        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    };


  return (
    <div className="relative w-full mobile:max-w-[350px] flex flex-col items-center">
        <div className="text-4xl mobile:text-2xl font-semibold text-center">
            Unlock the <HighlightText text={"Power of Code"}/>
        </div>
        <p className="text-center text-richblack-300 text-[16px] font-medium mt-3">
            Learn to build anything you can imagine
        </p>

        <div className="flex flex-row mobile:flex-col mobile:rounded-xl mobile:mb-0 rounded-full w-fit mobile:bg-richblack-700 bg-richblack-800 mb-5 border-1 border-richblack-100 mt-5 p-1">
            {
                tabsName.map((element, index) => {
                    return (
                        <div 
                        className={`text-[16px] flex flex-row items-center gap-2 m-1 
                         ${currentTab === element 
                            ? "bg-richblack-900 text-richblack-5 font-medium" 
                            : "text-richblack-200"} rounded-full transition-all duration-500 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-7 py-2`}
                        key={index} onClick={() => setMyCards(element)} >
                            {element}
                        </div>
                    )
                })
            }
        </div>
        
        <div className="h-[240px] mobile:h-[550px] "></div>

        <div className="absolute left-0  top-[50%] mobile:top-[42%]   flex flex-row mobile:flex-col  mobile:gap-y-5  gap-5 items-start justify-between w-full">
            {
                courses.map((element, index) => {
                    return (
                        <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} />
                    )
                })
            }
        </div>

    </div>
  );
};

export default ExploreMore;
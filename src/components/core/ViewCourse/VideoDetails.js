/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLectures } from "../../../slices/viewCourseSlice";
import {
  BigPlayButton,
  ControlBar,
  CurrentTimeDisplay,
  ForwardControl,
  PlayToggle,
  PlaybackRateMenuButton,
  Player,
  ReplayControl,
  TimeDivider,
  VolumeMenuButton,
} from "video-react";
import "video-react/dist/video-react.css"; // import css
import IconBtn from "../../common/IconBtn";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const playerRef = useRef();
  const { token } = useSelector((state) => state.auth);
  const { courseEntireData, courseSectionData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) {
        return;
      }
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses");
      } else {
        const filteredData = courseSectionData.filter(
          (section) => section._id === sectionId
        );
        const filteredVideoData = filteredData?.[0]?.subSections.filter(
          (data) => data._id === subSectionId
        );
        setVideoData(filteredVideoData);
      }
    };
    setVideoSpecificDetails();
  }, [courseEntireData, courseSectionData, location.pathname]);

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((data) => data._id === subSectionId);
    if (currentSubSectionIndex === 0 && currentSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSections.length;
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((data) => data._id === subSectionId);
    if (
      currentSubSectionIndex === noOfSubSections - 1 &&
      currentSectionIndex === courseSectionData.length - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data?._id === sectionId
    );
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSections.length;
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((data) => data?._id === subSectionId);
    if (currentSubSectionIndex !== noOfSubSections - 1) {
      // same section next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubSectionIndex + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      // different section first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1]?.subSections[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data?._id === sectionId
    );
    const currentSubSectionIndex = courseSectionData?.[
      currentSectionIndex
    ]?.subSections.findIndex((data) => data?._id === subSectionId);

    if (currentSubSectionIndex !== 0) {
      // same section previous video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex]?.subSections[
          currentSubSectionIndex - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      // different section first video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]?._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1]?.subSections.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1]?.subSections[
          prevSubSectionLength - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div className="text-white w-11/12 desktop:ml-[26rem] desktop:w-10/12 max-w-[calc(100vw-500px)] flex flex-col gap-y-2 mx-auto">
      {!videoData ? (
        <div className="flex items-center justify-center mt-[15rem] text-4xl font-semibold">
          No Data Found
        </div>
      ) : (
        <div>
          <Player
            ref={playerRef}
            aspectRatio="16:9"
            autoPlay={false}
            playsInline
            onEnded={() => setVideoEnded(true)}
            src={videoData[0]?.videoUrl}
            className="flex items-center justify-center mt-5"
          >
            <BigPlayButton position="center" />

            <ControlBar>
              {/*Forwar and backward buttons  */}
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />

              <PlayToggle />

              {/* Current display time */}
              <CurrentTimeDisplay order={4.1} />

              {/* Divider Sign */}
              <TimeDivider order={4.2} />

              {/* Speed of the Video */}
              <PlaybackRateMenuButton
                rates={[0.75, 1, 1.25, 1.5, 1.75, 2]}
                order={7.1}
              />

              {/* volume */}
              <VolumeMenuButton />
            </ControlBar>

            {videoEnded && (
              <div
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
                }}
                className="full absolute inset-0 z-[100] flex h-full flex-col items-center justify-center gap-y-2 font-inter"
              >
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark as Completed" : "Loading..."}
                    textColor={true}
                    bgColor={true}
                  />
                )}
                <IconBtn
                  disabled={loading}
                  onclick={() => {
                    if (playerRef?.current) {
                      playerRef.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text={"Rewatch"}
                  textColor={true}
                  bgColor={true}
                />

                <div className="flex flex-row gap-x-4">
                  {!isFirstVideo() && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => {
                        goToPrevVideo();
                      }}
                      text={"Previous Video"}
                      textColor={false}
                      bgColor={false}
                    />
                  )}
                  {!isLastVideo() && (
                    <IconBtn
                      disabled={loading}
                      onclick={() => {
                        goToNextVideo();
                      }}
                      text={"Next Video"}
                      textColor={false}
                      bgColor={false}
                    />
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}
      <h1 className="mt-4 text-3xl font-semibold">{videoData[0]?.title}</h1>
      <p className="pt-2 pb-6">{videoData[0]?.description}</p>
    </div>
  );
};

export default VideoDetails;

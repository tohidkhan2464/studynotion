import React, { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const InstrutorChart = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  // function to generate random colors
  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
        Math.random() * 255
      )}, ${Math.floor(Math.random() * 255)})`;
      colors.push(color);
    }
    return colors;
  };

  //   create data for chart displaying student info
  const chartDataForStudents = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalStudentsEnrolled),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  //   create data for chart displaying income info
  const chartDataForIncome = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        data: courses.map((course) => course.totalAmountGenerated),
        backgroundColor: getRandomColors(courses.length),
      },
    ],
  };

  //   create options
  const options = {
    responsive: true, // Enable responsiveness to resize the chart based on the container
    maintainAspectRatio: false, // Allow the chart to not maintain aspect ratio when resizing

    // Configure the appearance of the chart
    plugins: {
      legend: {
        display: true, // Show/hide the legend
        position: "top", // Position of the legend (top, bottom, left, right)
      },
      title: {
        display: true, // Show/hide the chart title
        text: `${currChart === "students" ? "Students" : "Income"}`, // Title text
        font: {
          size: 16, // Title font size
          weight: "bold", // Title font weight
        },
      },
    },
  };

  return (
    <div className="bg-richblack-800 px-8 py-4 w-full rounded-lg ">
      <p className="text-xl font-semibold">Visualize</p>
      <div className="flex flex-row gap-x-5 mt-4">
        <button
          onClick={() => setCurrChart("students")}
          className={`  px-2 rounded-md py-1 font-semibold transition-all duration-200 ${
            currChart === "students"
              ? " text-yellow-5 bg-richblack-900"
              : " text-yellow-300"
          }`}
        >
          Students
        </button>
        <button
          onClick={() => setCurrChart("income")}
          className={`px-2 rounded-md py-1 font-semibold transition-all duration-200 ${
            currChart === "income"
              ? " text-yellow-5 bg-richblack-900"
              : " text-yellow-300"
          }`}
        >
          Income
        </button>
      </div>
      <div className="h-[20rem] w-full">
        <Pie
          data={
            currChart === "students" ? chartDataForStudents : chartDataForIncome
          }
          options={options}
        />
      </div>
    </div>
  );
};

export default InstrutorChart;

function CalculateTotalDuration(course) {
  let totalDurationInSeconds = 0;
  course?.courseContent?.forEach((content) => {
    content?.subSections?.forEach((subSection) => {
      const timeDurationInSeconds = parseInt(subSection.timeDuration);
      totalDurationInSeconds += timeDurationInSeconds;
    });
  });
  const hours = Math.floor(totalDurationInSeconds / 3600);
  const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
  const seconds = Math.floor((totalDurationInSeconds % 3600) % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  } else {
    return `${seconds}s`;
  }
}

export default CalculateTotalDuration;

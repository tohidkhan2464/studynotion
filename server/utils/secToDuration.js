const convertSecondsToDuration = async (totalSeconds) => {
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  console.log("hours: " + hours);
  console.log("minutes: " + minutes);
  console.log("seconds: " + seconds);

  // If you want strings with leading zeroes:
  minutes = String(minutes).padStart(2, "0");
  hours = String(hours).padStart(2, "0");
  seconds = String(seconds).padStart(2, "0");
  return hours + ":" + minutes + ":" + seconds;
};

module.exports = convertSecondsToDuration;

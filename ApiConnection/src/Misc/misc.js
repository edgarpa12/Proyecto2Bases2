function restDates(f1, f2) {
  // JavaScript program to illustrate
  // calculation of no. of days between two date

  // To calculate the time difference of two dates
  var Difference_In_Time = f2.getTime() - f1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  //To display the final no. of days (result)
  return Difference_In_Days
}

function subtractYear(date) {
  const parsedDate = new Date(date);
  parsedDate.setMonth(parsedDate.getMonth() - 12);
  return parsedDate.toISOString().slice(0, 10);
}

function subtractDays(date, days) {
  const parsedDate = new Date(date);
  parsedDate.setDate(parsedDate.getDate() - days);
  return parsedDate.toISOString().slice(0, 10);
}
module.exports = {restDates:restDates,subtractDays:subtractDays,subtractYear:subtractYear};

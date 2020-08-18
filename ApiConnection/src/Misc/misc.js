function restDates(f1, f2) {
  // JavaScript program to illustrate
  // calculation of no. of days between two date

  // To calculate the time difference of two dates
  var Difference_In_Time = f2.getTime() - f1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

  //To display the final no. of days (result)
  return Difference_In_Days;
}

function subtractMonths(date, months) {
  const parsedDate = new Date(date);
  parsedDate.setMonth(parsedDate.getMonth() - months);
  return parsedDate.toISOString().slice(0, 10);
}

function subtractDays(date, days) {
  const parsedDate = new Date(date);
  if (parsedDate.getDate() - days < 0) {
    subtractMonths(parsedDate, 1);
  }
  parsedDate.setDate(parsedDate.getDate() - days);
  return parsedDate.toISOString().slice(0, 10);
}
function increaseDays(date, days) {
  const parsedDate = new Date(date);
  parsedDate.setDate(parsedDate.getDate() + days);
  return parsedDate.toISOString().slice(0, 10);
}

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getWeekDay(date) {
  var date = new Date(date);
  var weekdays = [
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
    "Domingo",
  ];
  return weekdays[date.getDay()];
}
module.exports = {
  restDates: restDates,
  subtractDays: subtractDays,
  subtractMonths: subtractMonths,
  increaseDays: increaseDays,
  randomInt: randomInt,
  getWeekDay: getWeekDay,
  getRandom:getRandom
};

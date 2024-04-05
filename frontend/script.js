const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let monthName = month[d.getMonth()];
let year = d.getFullYear();

document.getElementById("month").innerHTML = monthName;
document.getElementById("year").innerHTML = year;
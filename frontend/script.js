const header = document.querySelector(".mon");
const headerMini = document.querySelector(".month");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");
const navs1 = document.querySelectorAll("#previ, #nxt");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className}>${i}</li>`;
  }

  for (let i = end; i < 13; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  headerMini.textContent = `${months[month]} ${year}`;
}

navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();

const datesMain = document.querySelector(".dates-main");

function renderMainCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();
  let totalDays = start + endDate + (6 - end);

  let rows = Math.ceil(totalDays / 7);

  let datesHtml = "";
  let count = 0;

  for (let i = start; i > 0; i--) {
    if (rows === 6) {
      datesHtml += `<div onclick="myFunction('${
        (endDatePrev-i+1) + "-" + String(month) + "-" + year
      }')"> ${days[count]} <li class="inactive">${
        endDatePrev - i + 1
      }</li> <div class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "0"
      }"></div> <div class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "1"
      }"></div><div class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "2"
      }"></div> </div>`;
      count++;

      // done here working!!!!
    } else {
      datesHtml += `<div onclick="myFunction('${
        (endDatePrev-i+1) + "-" + String(month) + "-" + year
      }')"> ${days[count]} <li class="inactive">${
        endDatePrev - i + 1
      }</li> <div  class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "0"
      }"></div> <div  class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "1"
      }"></div> <div  class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "2"
      }"></div> <div  class="${
        "d" + (endDatePrev-i+1) + "-" + month + "-" + year + "-" + "3"
      }"></div>  </div>`;
      count++;
    }
  }

  // done completely working!!!!

  for (let i = 1; i <= endDate; i++) {
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    if (rows === 6) {
      if (count <= 6) {
        datesHtml += `<div onclick="myFunction('${
          (i) + "-" + String(month+1) + "-" + year
        }')"> ${days[count]} <li${className}>${i}</li> <div class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "0"
        }" ></div> <div class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "1"
        }"></div> <div class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "2"
        }"></div> </div>`;
        count++;
      } else {
        datesHtml += `<div onclick="myFunction('${
          (i) + "-" + String(month+1) + "-" + year
        }')"><li${className}>${i}</li> <div class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "0"
        }" ></div> <div class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "1"
        }"></div> <div class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "2"
        }"></div> </div>`;
        count++;
      }
    } else {
      if (count <= 6) {
        datesHtml += `<div onclick="myFunction('${
          (i) + "-" + String(month+1) + "-" + year
        }')">${days[count]}<li${className}>${i}</li> <div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "0"
        }"></div> <div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "1"
        }"></div><div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "2"
        }"></div> <div  class="${
          "d" + i + "-" + String(month +1) + "-" + year + "-" + "3"
        }"></div> </div>`;
        count++;
      } else {
        datesHtml += `<div onclick="myFunction('${
          (i) + "-" + String(month+1) + "-" + year
        }')"><li${className}>${i}</li> <div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "0"
        }"></div> <div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "1"
        }"></div> <div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "2"
        }"></div> <div  class="${
          "d" + i + "-" + String(month+1) + "-" + year + "-" + "3"
        }"></div> </div>`;
        count++;
      }
    }
  }

  for (let i = end; i < 6; i++) {
    if (rows == 6) {
      datesHtml += `<div onclick="myFunction('${
        (i-end+1) + "-" + String(month+2) + "-" + year
      }')"> <li class="inactive">${
        i - end + 1
      }</li> <div class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "0"
      }"></div> <div class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "1"
      }"></div> <div class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "2"
      }"></div> </div>`;
    } else {
      datesHtml += `<div onclick="myFunction('${
        (i-end+1) + "-" + String(month+2) + "-" + year
      }')"> <li class="inactive">${
        i - end + 1
      }</li> <div  class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "0"
      }"></div> <div  class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "1"
      }"></div> <div  class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "2"
      }"></div> <div  class="${
        "d" + (i-end+1) + "-" + String(month+2) + "-" + year + "-" + "3"
      }"></div> </div>`;
    }
  }

  datesMain.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;
  headerMini.textContent = `${months[month]} ${year}`;
  renderCalendar();
}

navs1.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "previ" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "nxt" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "nxt" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderMainCalendar();
  });
});

renderMainCalendar();

document.getElementById("today-button").addEventListener("click", () => {
  const today = new Date();
  year = today.getFullYear();
  month = today.getMonth();
  renderMainCalendar();
});

function convertDateFormat(dateStr) {
  const [day, month, year] = dateStr.split('-');
  const formattedDay = day.padStart(2, '0');
  const formattedMonth = month.padStart(2, '0');
  return `${year}-${formattedMonth}-${formattedDay}`;
}


function myFunction(i) {
  console.log(i)
  const el = document.querySelector(`.d${String(i)}-0`);
  const el2 = document.querySelector(`.d${String(i)}-1`);
  const el3 = document.querySelector(`.d${String(i)}-2`);

  console.log("bla bla", el, el2, el3)
  val = convertDateFormat(i);

  if (el.innerHTML === "") {
    el.innerHTML = `(No title)`;
    el.classList.add("active");
  } else if (el2.innerHTML === "") {
    el2.innerHTML = `(No title)`;
    el2.classList.add("active");
  } else if (el3.innerHTML === "") {
    el3.innerHTML = `(No title)`;
    el3.classList.add("active");
  }
  
  console.log("val", val)
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function() {
    modal.style.display = "none";
    if (el.innerHTML === "(No title)") {
      el.innerHTML = "";
      el.classList.remove("active");
    } else if (el2.innerHTML === "(No title)") {
      el2.innerHTML = "";
      el2.classList.t.remove("active");
    } else if (el3.innerHTML === "(No title)") {
      el3.innerHTML = "";
      el3.classList.t.remove("active");
    }
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
      if (el.innerHTML === "(No title)") {
        el.innerHTML = "";
        el.classList.remove("active");
      } else if (el2.innerHTML === "(No title)") {
        el2.innerHTML = "";
        el2.classList.t.remove("active");
      } else if (el3.innerHTML === "(No title)") {
        el3.innerHTML = "";
        el3.classList.t.remove("active");
      }
    }
  }
  
  modal.style.display = "block";
  const alarmDateInput = document.getElementById('alarmDate');
  alarmDateInput.defaultValue=val;

  document.getElementById('eventForm').onsubmit = function(e) {
    e.preventDefault();
    modal.style.display = "none";
  }

  document.getElementById('save').onclick = function() {
    setAlarm(val, i);
    modal.style.display = "none";
  }
  function setAlarm(val, i) {
    console.log(i)
    const alarmTimeInput = document.getElementById('alarmTime'); 
    const eventName = document.getElementById('EventName').value;
    console.log(val)
    const alarmDateTime = new Date(`${val}T${alarmTimeInput.value}:00`);
    const now = new Date();
  
    if (alarmDateTime <= now) {
      alert('Please select a future date and time for the alarm.');
      return;
    }
  
    if (el.innerHTML === "(No title)") {
      el.innerHTML = eventName;
      el.classList.add("active");
    } else if (el2.innerHTML === "(No title)") {
      el2.innerHTML = eventName;
      el2.classList.add("active");
    } else if (el3.innerHTML === "(No title)") {
      el3.innerHTML = eventName;
      el3.classList.add("active");
    }

      const timeUntilAlarm = alarmDateTime - now;
      setTimeout(() => {
        alert('Alarm! It is time.');
      }, timeUntilAlarm);
    }
}

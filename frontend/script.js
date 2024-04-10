const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");
const currdate = document.querySelector(".calendar-current-date");
const calendar = document.getElementById('calendar');

function updateMonthAndYear(year, month) {
    let monthName = months[month];
    let years = year;
    document.getElementById("month").innerHTML = monthName;
    document.getElementById("year").innerHTML = years;
}


function generateCalendar() {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let monthlastdate = new Date(year, month, 0).getDate();
    let lit = "";

    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();

    for (let i = dayone; i > 0; i--) {
        lit += `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    for (let i = 1; i <= lastdate; i++) {
        let isToday = i === todayDate && month === todayMonth && year === todayYear ? "today" : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }

    let totalDays = dayone + lastdate;
    let remainingDays = 42 - totalDays;

    for (let i = 1; i <= remainingDays; i++) {
        lit += `<li class="inactive">${i}</li>`;
    }

    currdate.innerText = `${months[month]} ${year}`;
    day.innerHTML = lit;
}

function setToToday() {
    date = new Date();
    year = date.getFullYear();
    month = date.getMonth();
    generateCalendar();
    manipulateCalendar(year, month);
    updateMonthAndYear(year, month); // Update month and year when "today" is clicked
}

function drawBlankCalendar() {
    for (let i = 0; i < 35; i++) {
        const day = document.createElement('div');
        day.classList.add('day');

        const dayText = document.createElement('p');
        dayText.classList.add('day-text');

        const dayNumber = document.createElement('p');
        dayNumber.classList.add('day-number');

        const eventName = document.createElement('p');
        eventName.classList.add('event-name');

        day.appendChild(eventName);
        day.appendChild(dayText);
        day.appendChild(dayNumber);
        calendar.appendChild(day);
    }
}

function manipulateCalendar(year, month) {
    const dayElements = document.querySelectorAll('.day');
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInLastMonth = new Date(year, month, 0).getDate();

    let dayCount = 1;
    let nextMonthDayCount = 1;

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const today = new Date();

    for (let i = 0; i < 35; i++) {
        const day = dayElements[i]; 
        const dayNumber = day.querySelector('.day-number');
        const eventName = day.querySelector('.event-name');

        // Remove 'today' and 'inactive' class from all dates
        dayNumber.classList.remove('today');
        day.classList.remove('inactive');

        if (i < firstDayOfMonth) {
            dayNumber.textContent = daysInLastMonth - firstDayOfMonth + i + 1;
            day.classList.add('inactive'); // Add 'inactive' class to previous month dates
        } else if (i >= firstDayOfMonth && i < firstDayOfMonth + daysInMonth) {
            dayNumber.textContent = dayCount;
            dayCount++;
        } else {
            dayNumber.textContent = nextMonthDayCount++;
            day.classList.add('inactive'); // Add 'inactive' class to next month dates
        }

        if (i < 7) {
            eventName.textContent = days[i % 7];
        }

        // Check if the date is today's date for the current month and year
        if (year === today.getFullYear() && month === today.getMonth() && parseInt(dayNumber.textContent) === today.getDate()) {
            dayNumber.classList.add('today'); // Add 'today' class to the 'day-number' element if it is the current date
        }
    }
}

function changeMonth(increment) {
    month += increment;
    if (month > 11) {
        month = 0;
        year++;
    } else if (month < 0) {
        month = 11;
        year--;
    }
    date.setFullYear(year);
    date.setMonth(month);
    manipulateCalendar(year, month);
    generateCalendar();
    updateMonthAndYear(year, month); // Pass year and month as parameters
}

function changeMiniMonth(increment) {
    month += increment;
    if (month > 11) {
        month = 0;
        year++;
    } else if (month < 0) {
        month = 11;
        year--;
    }
    date.setFullYear(year);
    date.setMonth(month);
    generateCalendar();
}

function setupEventListeners() {
    document.getElementById('today-button').addEventListener('click', setToToday);
    document.getElementById('nxt').addEventListener('click', () => changeMonth(1));
    document.getElementById('prev').addEventListener('click', () => changeMonth(-1));
    document.getElementById('calendar-prev').addEventListener('click', () => changeMiniMonth(-1));
    document.getElementById('calendar-next').addEventListener('click', () => changeMiniMonth(+1));
}

updateMonthAndYear(year, month);
generateCalendar();
drawBlankCalendar();
manipulateCalendar(year, month);
setupEventListeners();
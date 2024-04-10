const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let monthName = months[d.getMonth()];
let years = d.getFullYear();

document.getElementById("month").innerHTML = monthName;
document.getElementById("year").innerHTML = years;

let date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const day = document.querySelector(".calendar-dates");

const currdate = document
    .querySelector(".calendar-current-date");

const prenexIcons = document
    .querySelectorAll(".calendar-navigation span");

// Function to generate the calendar
const manipulate = () => {
    let dayone = new Date(year, month, 1).getDay();
    let lastdate = new Date(year, month + 1, 0).getDate();
    let monthlastdate = new Date(year, month, 0).getDate();
    let lit = "";

    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    for (let i = 1; i <= lastdate; i++) {
        let isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "today" : "";
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

manipulate();

prenexIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;
        
        if (month < 0 || month > 11) {
            date = new Date(year, month, new Date().getDate());
            year = date.getFullYear();
            month = date.getMonth();
        }

        else {
            date = new Date();  
        }
        manipulate();
    });
});

const button = document.getElementById('today-button'); // Replace 'your-button-id' with the actual ID of your button

// Assign the setToToday function to the button's click event

const setToToday = () => {
    let today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    date = today.getDate();
    manipulate(); // Call the manipulate function to update the calendar
    manipulate1(year, month);
}

button.addEventListener('click', setToToday);

    
const calendar = document.getElementById('calendar');

const drawBlankCalendar = () => {
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

drawBlankCalendar();

const manipulate1 = (year, month) => {
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

manipulate1();

const nxt = document.getElementById('nxt'); 
const prev = document.getElementById('prev');

nxt.addEventListener('click', () => {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    manipulate1(year, month);
    console.log(month);
});

prev.addEventListener('click', () => {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    manipulate1(year, month);
    console.log(month);
});
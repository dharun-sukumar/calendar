const mon = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const d = new Date();
let monthName = mon[d.getMonth()];
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

// Array of month names
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// Function to generate the calendar
const manipulate = () => {

    // Get the first day of the month
    let dayone = new Date(year, month, 1).getDay();

    // Get the last date of the month
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Get the last date of the previous month
    let monthlastdate = new Date(year, month, 0).getDate();

    // Variable to store the generated calendar HTML
    let lit = "";

    // Loop to add the last dates of the previous month
    for (let i = dayone; i > 0; i--) {
        lit +=
            `<li class="inactive">${monthlastdate - i + 1}</li>`;
    }

    // Loop to add the dates of the current month
    // Other parts of the code remain the same

    // Loop to add the dates of the current month
    for (let i = 1; i <= lastdate; i++) {
        // Check if the current date is today
        let isToday = i === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear() ? "today" : "";
        lit += `<li class="${isToday}">${i}</li>`;
    }

    // Rest of the code remains the same

    // Get the total number of days already filled (previous month's days + current month's days)
    let totalDays = dayone + lastdate;

    // Calculate the remaining days to fill the grid
    let remainingDays = 42 - totalDays;

    // Loop to add the first dates of the next month
    for (let i = 1; i <= remainingDays; i++) {
        lit += `<li class="inactive">${i}</li>`;
    }

    // Update the text of the current date element 
    // with the formatted current month and year
    currdate.innerText = `${months[month]} ${year}`;

    // with the generated calendar
    day.innerHTML = lit;
}

manipulate();

// Attach a click event listener to each icon
prenexIcons.forEach(icon => {

    // When an icon is clicked
    icon.addEventListener("click", () => {

        // Check if the icon is "calendar-prev"
        // or "calendar-next"
        month = icon.id === "calendar-prev" ? month - 1 : month + 1;

        // Check if the month is out of range
        if (month < 0 || month > 11) {

            // Set the date to the first day of the 
            // month with the new year
            date = new Date(year, month, new Date().getDate());

            // Set the year to the new year
            year = date.getFullYear();

            // Set the month to the new month
            month = date.getMonth();
        }

        else {

            // Set the date to the current date
            date = new Date();  
        }

        // Call the manipulate function to 
        // update the calendar display
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

        const eventName = document.createElement('small');
        eventName.classList.add('event-name');

        day.appendChild(dayText);
        day.appendChild(dayNumber);
        day.appendChild(eventName);
        calendar.appendChild(day);
    }
}

drawBlankCalendar();

const manipulate1 = () => {
    const dayElements = document.querySelectorAll('.day');
    const date = new Date();
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    const daysInLastMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    let dayCount = 1;
    let nextMonthDayCount = 1;

    for (let i = 0; i < 35; i++) {
        const day = dayElements[i];
        const dayNumber = day.querySelector('.day-number');
        const eventName = day.querySelector('.event-name');

        if (i < firstDayOfMonth) {
            dayNumber.textContent = daysInLastMonth - firstDayOfMonth + i + 1;
            eventName.textContent = '';
        } else if (i >= firstDayOfMonth && i < firstDayOfMonth + daysInMonth) {
            dayNumber.textContent = dayCount++;
            eventName.textContent = '';
            dayNumber.textContent = nextMonthDayCount++;
            eventName.textContent = '';
        }
    }
}

manipulate1();
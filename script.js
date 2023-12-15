const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");


//get new date, current year and month

let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
"August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDate(), //get first day of the month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), //get last date of the month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), //get last day of the month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); //get last day of the previous month
    let liTag = "";

    for (let x = firstDayofMonth; x > 0; x--) {  //create li of previous month last days
        liTag += `<li class = "inactive">${lastDateofLastMonth - x + 1}</li>`; 
    }

    for (let x = 1; x <= lastDateofMonth; x++) {  //create li of all days of current month
        
        //add active class to li if the current day, month and year matched
        let isToday = x === date.getDate() && currMonth === new Date().getMonth()
                        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class = "${isToday}">${x}</li>`;
    }

    for (let x = lastDayofMonth; x < 6; x++) {  //create li of next month first date
        liTag += `<li class = "inactive">${x - lastDayofMonth + 1}</li>`;
    }


    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}

renderCalendar();


prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => { //add click event on both icons

        //if click icon is previous icon then decrement month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) {  //if current month is less than 0 or grater than 11
            //create a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();  //update current year with new date year
            currMonth = date.getMonth();  //update current month with new date month
        }else {  //else pass new date as date value
            date = new Date();
        }

        renderCalendar();
    });
});
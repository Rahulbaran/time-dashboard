'use strict'

const activityTime = document.querySelectorAll('.activity__time__wrapper h2');
const lastActivityTime = document.querySelectorAll('.activity__time__wrapper p');
const timeBtns = document.querySelectorAll('.time__period__btn');




timeBtns.forEach(timeBtn => {

    // Event handler for time period button
    timeBtn.addEventListener('click', function () {
        
        // Switching the button color
        timeBtns.forEach(timePeriodBtn => {
            if(timePeriodBtn !== this) timePeriodBtn.style.color = 'hsl(235, 45%, 61%)';
            else this.style.color = 'hsl(236, 100%, 87%)';
        });


        //Making AJAX Call for receiving the json data from data.json
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open('GET', '../data.json');


        xhr.onreadystatechange = () => {
            if(xhr.readyState === xhr.DONE) {
                const res = xhr.response;

                if (this.classList.contains('daily__btn')) { 

                    for(let i=0; i < 6;i++) {
                        activityTime[i].textContent = `${res[i].timeframes.daily.current}hrs`;
                        lastActivityTime[i].textContent = `Last Day - ${res[i].timeframes.daily.previous}hrs`
                    }
                }
                else if(this.classList.contains('weekly__btn')) {
                    for(let i=0; i < 6;i++) {
                        activityTime[i].textContent = `${res[i].timeframes.weekly.current}hrs`;
                        lastActivityTime[i].textContent = `Last Week - ${res[i].timeframes.weekly.previous}hrs`
                    }
                }
                else if(this.classList.contains('monthly__btn')) {
                    for(let i=0; i < 6;i++) {
                        activityTime[i].textContent = `${res[i].timeframes.monthly.current}hrs`;
                        lastActivityTime[i].textContent = `Last Month - ${res[i].timeframes.monthly.previous}hrs`
                    }
                }
            }
        }

        xhr.onerror = () => console.error('Something unexpected happened');
        xhr.send();
    })
})
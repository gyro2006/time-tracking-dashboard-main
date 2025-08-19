fetchData();
const dailyBtn = document.getElementById("daily_btn");
const weeklyBtn = document.getElementById("weekly_btn");
const monthlyBtn = document.getElementById("monthly_btn");
let dailyElements = Array.from(document.getElementsByClassName("daily"));
let weeklyElements = Array.from(document.getElementsByClassName("weekly"));
let monthlyElements = Array.from(document.getElementsByClassName("monthly"));

function showElements(element) {
    element.classList.remove("hide");
    element.classList.add("show");
}
function hideElements(element) {
    element.classList.remove("show");
    element.classList.add("hide");
}

dailyBtn.onclick = function(){
    dailyElements.forEach(showElements);
    weeklyElements.forEach(hideElements);
    monthlyElements.forEach(hideElements);
}
weeklyBtn.onclick = function(){
    dailyElements.forEach(hideElements);
    weeklyElements.forEach(showElements);
    monthlyElements.forEach(hideElements);
}
monthlyBtn.onclick = function(){
    dailyElements.forEach(hideElements);
    weeklyElements.forEach(hideElements);
    monthlyElements.forEach(showElements);
}

async function fetchData(){
    try{
        const response = await fetch('data.json');

        if(!response.ok){
            throw new Error("could not fetch resource");
        }

        const data = await response.json();
        data.forEach(getActivityTitle);

        function getActivityTitle(activity, index) {
            function yeehaw(timeframe, time){
                if(timeframe == "daily"){
                    if(time == "current") {
                        if(activity.timeframes.daily.current == 1) {
                            return "hr";
                        }
                        else {
                            return "hrs";
                        }
                    }
                    else {
                        if(activity.timeframes.daily.previous == 1) {
                            return "hr";
                        }
                        else {
                            return "hrs";
                        }
                    }
                } 
                else if(timeframe == "weekly"){
                    if(time == "current") {
                        if(activity.timeframes.weekly.current == 1) {
                            return "hr";
                        }
                        else {
                            return "hrs";
                        }
                    }
                    else {
                        if(activity.timeframes.weekly.previous == 1) {
                            return "hr";
                        }
                        else {
                            return "hrs";
                        }
                    }
                } 
                else if(timeframe == "monthly"){
                    if(time == "current") {
                        if(activity.timeframes.monthly.current == 1) {
                            return "hr";
                        }
                        else {
                            return "hrs";
                        }
                    }
                    else {
                        if(activity.timeframes.monthly.previous == 1) {
                            return "hr";
                        }
                        else {
                            return "hrs";
                        }
                    }
                } 
            }
            document.getElementById(`title_${index + 1}`).innerHTML = activity.title;
            document.getElementById(`daily_${index + 1}`).innerHTML += activity.timeframes.daily.current + yeehaw("daily", "current");
            document.getElementById(`daily_previous_${index + 1}`).innerHTML += activity.timeframes.daily.previous + yeehaw("daily", "previous");
            document.getElementById(`weekly_${index + 1}`).innerHTML += activity.timeframes.weekly.current + yeehaw("weekly", "current");
            document.getElementById(`weekly_previous_${index + 1}`).innerHTML += activity.timeframes.weekly.previous + yeehaw("weekly", "previous");
            document.getElementById(`monthly_${index + 1}`).innerHTML += activity.timeframes.monthly.current + yeehaw("monthly", "current");
            document.getElementById(`monthly_previous_${index + 1}`).innerHTML += activity.timeframes.monthly.previous + yeehaw("monthly", "previous");

        }
    }
    catch(error){
        console.error(error);
    }
}
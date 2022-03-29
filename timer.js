// updating the page timer seconds by seconds
timer();
date();

function timer(){
   var currentTime = new Date()
   var hours = currentTime.getHours()
   var minutes = currentTime.getMinutes()
   var sec = currentTime.getSeconds()
   if (minutes < 10){
       minutes = "0" + minutes
   }
   if (sec < 10){
       sec = "0" + sec
   }
   var t_str = hours + ":" + minutes + ":" + sec + " ";
   if(hours > 11){
      t_str += "PM";
   } else {
      t_str += "AM";
   }
    document.getElementById('time-span').innerHTML = t_str;
    setTimeout(timer,1000);
}

function date(){
    var date = new Date();
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    dateString = weekday[date.getDay()] + ", " + date.getDate() + " " + month[date.getMonth()] + " " + date.getFullYear();

    document.getElementById('date-span').innerHTML = dateString;
}
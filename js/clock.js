//sets the date and time as displayed
function GetDateTime(){
    
    var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var d = new Date();
    
    //gets the basic information needed
    var month = monthNames[d.getMonth()]; 
    var day = d.getUTCDate();
    var hour = d.getUTCHours();
    var mins = d.getUTCMinutes();
    var ap;
    
    //changes it from a 24 hour clock to 12 hour, and sets AM / PM
    if(hour == 0){
        ap = " AM";
        hour = 12;
    }
    else if(hour < 12){
        ap = " AM";
    }
    else if(hour == 12){
        ap = " PM";
    }
    else if(hour > 12){
        ap = " PM";
        hour -= 12;
    }   

    //sets the 0 in front of minutes when under 10
    if(mins <= 9){
        mins = "0" + mins;
    }
    
    //final string to be displayed
    var dateTime = month + " " + day + ", " + hour + ":" + mins + " " + ap + " UTC";

    document.getElementById("dateTime").innerHTML = dateTime;
    
}

GetDateTime();
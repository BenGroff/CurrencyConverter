//--------------------------------------------------------
//--------------------------------------------------------
//    
//    TABLE OF CONTENTS:
//    CURRENCY CONVERTER MAIN LOGIC
//    
//    FUNC 1 ** Create Select Options
//    FUNC 2 ** Gets the Selected Currency
//    FUNC 3 ** Creates the Title
//    FUNC 4 ** Live Update Conversion
//
//--------------------------------------------------------
//--------------------------------------------------------






//--------------------------------------------------------
//--------------------------------------------------------
//  FUNC 1
//  Create Select Options
//--------------------------------------------------------
//--------------------------------------------------------


function createOptions() {
    
    //gets rates list from storage
    var rates = JSON.parse(localStorage.getItem("rates"));
    
    //gets the select box ID's
    var toCurr = document.getElementById("toCurr");
    var fromCurr = document.getElementById("fromCurr");
    
    //initialize vars
    var ratesList = [];
    var newRate;
    
    //takes rates obj and makes it an obj array
    for (i in rates) {
        newRate = {
            "currency" : i,
            "rate" : rates[i]
        };

        ratesList.push(newRate);
    }
    
    //adds euro to list
    newRate = {
        "currency" : 'EUR',
        "rate" : 1.00};
    ratesList.push(newRate);
    
    //sorts the object array
    ratesList.sort(function(a, b){
        if(a.currency < b.currency) { return -1; }
        if(a.currency > b.currency) { return 1; }
        return 0;
    });
    
    //loops through rates obj
    for (var x = 0; x < ratesList.length; x++) {
        
        var rec = ratesList[x];
        
        //writes in the options
        toCurr.innerHTML += '<option value="' + rec.rate + '">' + rec.currency + '</option>';
        fromCurr.innerHTML += '<option value="' + rec.rate + '">' + rec.currency + '</option>';
        
    }
}






//--------------------------------------------------------
//--------------------------------------------------------
//  FUNC 2
//  Gets the Selected Currency
//--------------------------------------------------------
//--------------------------------------------------------


function getSelect(sel, el) {
    
    //creates currency object
    var currency = {
        "currency" : sel.options[sel.selectedIndex].text,
        "rate"     : sel.options[sel.selectedIndex].value
    };
    
    if (el == 'from') {
        localStorage.setItem("fromCurr", JSON.stringify(currency));
    }
    else {
        localStorage.setItem("toCurr", JSON.stringify(currency));
    }
    setTitle(el);
}

$(document).ready(function () {
    $("#fromCurr").trigger("change");
});

$(document).ready(function () {
    $("#toCurr").trigger("change");
});






//--------------------------------------------------------
//--------------------------------------------------------
//  FUNC 3
//  Creates the Title
//--------------------------------------------------------
//--------------------------------------------------------


function setTitle(el) {
    
    //gets selected currencies
    var toCurr = JSON.parse(localStorage.getItem("toCurr"));
    var fromCurr = JSON.parse(localStorage.getItem("fromCurr"));
    
    //finds the rate and rounds it
    var rate = parseFloat(toCurr.rate) / parseFloat(fromCurr.rate);
    var convertRate = rate.toFixed(2);
    
    //stores rate
    localStorage.setItem("convertRate", JSON.stringify(convertRate));
    
    //writes the title
    document.getElementById("convertFrom").innerHTML = "1 " + fromCurr.currency + " equals";
    document.getElementById("convertTo").innerHTML =  convertRate + " " + toCurr.currency;
    
    //if the user entered values
    if (document.getElementById("fromAmt").value && document.getElementById("toAmt").value) {
        liveConvertUpdate(el);    
    }
}






//--------------------------------------------------------
//--------------------------------------------------------
//  FUNC 4
//  Live Updates Conversion
//--------------------------------------------------------
//--------------------------------------------------------


function liveConvertUpdate(el) {
    
    //gets the values of both input boxes
    var fromAmt = parseFloat(document.getElementById("fromAmt").value);
    var toAmt = parseFloat(document.getElementById("toAmt").value);
    
    //gets the conversion rate
    var convertRate = JSON.parse(localStorage.getItem("convertRate"));
    var rate = parseFloat(convertRate);
    
    //if fromCurr input or select was changes
    if (el == 'from') {
        
        //does the conversion and rounds it
        var amt = fromAmt * rate;
        var rAmt = amt.toFixed(2);
        
        //sets the toAmt value
        document.getElementById("toAmt").value = rAmt;
    }
        
    //if toCurr input or select was changes   
    else {
        
        //does the conversion and rounds it
        var amt = toAmt * rate;
        var rAmt = amt.toFixed(2);
        
        //sets the fromAmt value
        document.getElementById("fromAmt").value = rAmt;
    }
}
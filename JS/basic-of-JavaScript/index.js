var arr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']


function updateTime(){

    var d = new Date();    
    var a = d.getDate();
    var b = d.getMonth();
    var c = d.getFullYear();
    
    var h = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    
    var day = d.getDay();
    var date = a+"/"+b+"/"+c;
    
    
    var x = document.getElementsByClassName('date')[0];
    
    x.innerHTML = date;
    document.getElementsByClassName('day')[0].innerHTML = arr[day];
    if(h>12)
    var time = h%12+":"+m+":"+s+" PM";
    else
    time = h+":"+m+":"+s+" AM";
    document.getElementsByClassName('time')[0].innerHTML = time;
    
    if(h>=1 && h<12)
    {
        document.getElementsByClassName('morning')[0].innerHTML = "MORNING"
    }
    else if (h>=12 && h<18)
    {
        document.getElementsByClassName('morning')[0].innerHTML = "AFTERNOON"
    }
    else
    {
        document.getElementsByClassName('morning')[0].innerHTML = "EVENING"
    }
    setTimeout(updateTime,1000);
}
updateTime();

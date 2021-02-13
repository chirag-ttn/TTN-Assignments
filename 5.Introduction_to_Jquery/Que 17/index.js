
$(document).ready(function(){
    var arr = [
        `<img src="./img1.jpeg" alt="1" height=100px width=100px>`,
        `<img src="./img2.jpg" alt="2" height=100px width=100px>`,
        `<img src="./img3.jpeg" alt="3" height=100px width=100px>`
    ]
    console.log(arr)
    $('#parent').html(arr[0]);
    setInterval(() => {
       randomImg(); 
    }, 500);
    function randomImg(){
        console.log('called')
        let rI = Math.floor(Math.random()*arr.length);
        $('#parent').html(arr[rI]);
    }
    })
    

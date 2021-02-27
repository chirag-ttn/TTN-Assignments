$(document).ready(()=>{
    $('button').click(function(){
        $.get('https://webhook.site/3f15aa7e-a342-4ef1-88a9-4b3ef1dd6f72',function(data, status){
            
            $('html').append(`<p> data: ${data} <br> status: ${status}<p>`)
        })
    })
})
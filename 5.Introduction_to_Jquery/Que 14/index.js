$().ready(()=>{
    $('li').each(function(){
        if($(this).text()>10)
        {
            $(this).css('color','red');
        }
        
    })
})
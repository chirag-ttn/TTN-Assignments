$().ready(()=>{
    $('button').click(function(){
        $(this).parent().remove();
    })
})
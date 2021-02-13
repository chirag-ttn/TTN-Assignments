$().ready(()=>{
    $("select").change(function(){
        $("#div").append($("#cars option:selected").text());
    })
})
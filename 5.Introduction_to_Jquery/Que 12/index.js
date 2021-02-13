$().ready(()=>{
    function showAlert(){
        alert((this).tagName)
        event.stopPropagation();
    }
    var elems = document.querySelectorAll("div,p,ul,li")
    for(let ele of elems)
    {
        ele.addEventListener('click',showAlert);
    }
    // elems.forEach((ele)=>{
    //     $(document).on('click',ele,showAlert)
    // })
    
})
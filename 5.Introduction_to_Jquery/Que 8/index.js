$(document).ready(()=>{
    function copyFun(){
        $(this).after(`<button>Click</button>`)
    }
    $(document).on('click','button',copyFun)
})
$.get('/data', (data) => {
    data.map((d)=>{
        $('table').append(`
        <tr key=${d.date}>
            <td>${d.firstname}</td>
            <td>${d.lastname}</td>
            <td>${d.subject}</td>
            <td>${d.gender}</td>
            <td>${d.age}</td>
            <td><button class="remove">X</button></td>
        </tr>
        X`)
    })
    
})
$('table').on('click','.remove',function(){
    // console.log(this)
    this.parentElement.parentElement.remove()
    const key = this.parentElement.parentElement.getAttribute('key')
    $.ajax({
        url: 'http://localhost:3000/data',
        type: 'DELETE',
        data: {key:key}
    });
    
    
    
})
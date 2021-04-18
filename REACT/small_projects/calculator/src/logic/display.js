import {compute} from '../logic/compute'
export const handleDisplayText = (button,text)=>{
    
if(button=='+' || button=='-' ||  button=='X' || button=='/' || button=='%')
{
    return text+' '+button+' '
}
else if(+button>=0 && +button<=9)
{
    return text+button;
}
else if(button=='=')
{
    // fucntion
    console.log(text.split(' '))
    return compute(text)
}    
else if(button=='CE'){
    return text.slice(0,-1)
}
else{
    return text+button;
}
}
import React,{ useEffect } from 'react'
import classes from './cockpit.module.css'
const Cockpit = (props)=>{
    useEffect(()=>{
        console.log('cockpit.js useEffect')
        setTimeout(()=>{
            alert('Save data to cloud')  
        },1000)
        return ()=>{ 
            console.log('cockpit.js CleanUP work')
        };
    },[]);
    const assClasses = []
    let btnClass = ''
    if(props.showPersons)
    {
        btnClass=classes.Red;
    }
    
    if(props.persons.length<=2)
    {
      assClasses.push(classes.Red);
    }
    if(props.persons.length<=1)
    {
      assClasses.push(classes.Bold)
    }
    
    return(
        
    <div className={classes.Cockpit}>
         
        <p className={assClasses.join(' ')}>Hi I am react app</p>
        <button className = {btnClass}  alt = {props.showPersons} onClick = {()=> props.clicked()}>SwitchName</button>
        
        
    </div>
    )
    
}

export default Cockpit;
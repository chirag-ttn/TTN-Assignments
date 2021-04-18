import React from 'react'
import Classes from './Display.module.css'


class Display extends React.Component{
    render(){
        return(
            <div className={Classes.display}>
                <p className={Classes.displayText}>{this.props.text}</p>
                
            </div>
        )
    }
}
export default Display;
import { Component } from "react";
import BoilingVerdict from '../../components/BoilingVerdict'
import InputHandler from "./InputHandler";
const tryConvert = (temprature,convert)=>{
    // temprature -> temp in either *C or *F
    // convert -> function to convert to celcius or *F
    let temp = parseFloat(temprature)
    if(Number.isNaN(temp))
        return ''
    const out = convert(temp.toFixed(2))
    return out.toString();

}
const toCelcius = (temp)=>{
    return (temp - 32)/1.8;
}
const toFarhaniet = (temp)=>{
    return (temp*1.8 + 32);
}
class Thermo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            temprature:'',scale:'c'
        }
    }
    onCelciusChange = (value)=>{
        this.setState({
            temprature:value,
            scale:'c'
        })
    }
    onFarhanietChange = (value)=>{
        this.setState({
            temprature:value,
            scale:'f'
        })
    }


        render() {
            const scale = this.state.scale
            const temprature = this.state.temprature
            const celcius = scale==='f' ? tryConvert(temprature,toCelcius):temprature
            const farhaniet = scale==='c' ? tryConvert(temprature,toFarhaniet):temprature
            return (
                <>
                    <InputHandler scale='c' temprature={celcius} onTempratureChange = {this.onCelciusChange}/>
                    <InputHandler scale='f' temprature={farhaniet} onTempratureChange = {this.onFarhanietChange}/>
                    <BoilingVerdict celcius={this.state.temprature} />
                </>
            )
        }
    }
    export default Thermo;
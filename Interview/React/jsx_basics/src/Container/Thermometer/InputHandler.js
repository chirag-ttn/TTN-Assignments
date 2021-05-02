import { Component } from "react";

const scaleNames = {
    c:'celcius',
    f:'farhaneit'
}
class InputHandler extends Component {
    constructor(props) {
        super(props)
        

    }
    handleChange = (e) => {
        this.props.onTempratureChange(e.target.value)
    }

    render() {
        const scale = this.props.scale;
        return (
            <>
                <fieldset>
                    <legend>Enter temperature in {scaleNames[scale]}:</legend>
                    <input value={this.props.temprature}
                        onChange={this.handleChange} />
                </fieldset>
                
            </>
        )
    }
}
export default InputHandler;
import classes from "../Input/Input.module.css";

const input  = (props)=>{
    const InputClass = [classes.InputElement]
    if(props.Invalid && props.shouldValidate &&props.touched)
    {
        InputClass.push(classes.Invalid)
    }

    let inputElement = null;
    switch(props.elementType){
        case('input'):
            inputElement=<input onChange={props.changed} className={InputClass.join(' ')}{...props.elementConfig} value={props.value} />
            break;
        case('textarea'):
            inputElement=<textarea onChange={props.changed} className={InputClass.join(' ')}{...props} value={props.value} />
            break;
        case('select'):
            inputElement=
            <select onChange={props.changed} 
            className={InputClass.join(' ')}
            value={props.value}
            >   {props.elementConfig.options.map(option=>(
                <option value={option.value}>{option.displayValue}</option>
            ))}
                
                
            </select>
            break;
        default:
            inputElement=<input onChange={props.changed} className={InputClass.join(' ')}{...props} value={props.value} />
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}
export default input;
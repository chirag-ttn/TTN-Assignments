import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props)=>{
    const ingrdientSummary = Object.keys(props.ingredients)
    .map(igKey=>{
        return (<li key={igKey}> <span style={{textTransform:"capitalize"}}>{igKey}</span> : {props.ingredients[igKey]}</li>)
    })
    return(
        <Aux>
            <h3>Your order</h3>
            <p> A delicious burger with the following ingredients.</p>
            <ul>
                {ingrdientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continued}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;
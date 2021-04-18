export const compute = text=> {
    var [operand1,operator,operand2] = text.split(' ')
    operand1 = Number(operand1)
    operand2 = Number(operand2)
    switch(operator){
        case '+':{
            return new String((operand1+operand2).toFixed(2))
        }
        case '-':{
            return new String((operand1-operand2).toFixed(2))
        }
        case 'X':{
            return new String((operand1*operand2).toFixed(2))
        }
        case '/':{
            return new String((operand1/operand2).toFixed(2))
        }
        case '%':{
            return new String((operand1%operand2).toFixed(2))
        }
        default:{
            return 'Please select an operator'
        }
    }
}
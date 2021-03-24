const initialState = {
    persons:[]
}

const reducer = (state = initialState,actions)=>{
    switch(actions.type){
        case('ADDPERSON'):
            console.log("REACED",state.persons)
            const newPerson = {
                id: Math.random(), // not really unique but good enough here!
                name: 'Max',
                age: Math.floor( Math.random() * 40 )
            }
            return{
                ...state,
                persons:state.persons.concat(newPerson)
            }
        
        case('DELPERSON'):
            return{
                ...state,
                persons:state.persons.filter(res=>res.id!==actions.personId)
                
            }

        
    }
    return state;
    
}

export default reducer
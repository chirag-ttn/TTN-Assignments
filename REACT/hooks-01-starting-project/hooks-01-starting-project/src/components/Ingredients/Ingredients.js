import React, { useState, useEffect, useCallback, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList'
import ErrorModal from '../UI/ErrorModal'

const ingredientReducer = (currentIngredients, action) => {
  switch (action.type) {
    case "SET": {
      return action.ingredients
    }
    case "ADD": {
      return [...currentIngredients, action.ingredient]
    }
    case "DELETE": {
      return currentIngredients.filter(obj => obj.id !== action.id)
    }
    default:
      throw new Error('Should not reach here !')

  }
}
const httpsStateReducer = (httpState, action) => {
  switch (action.type) {
    case 'SEND':
      return { ...httpState, loading: true }
    case 'RESPONSE':
      return { ...httpState, loading: false }
    case 'ERROR':
      return { loading: false, error: action.error }
    case 'CLEAR_ERROR':
      return { ...httpState, error: null }
    default:
      throw new Error('You should not be here !')
  }
}

function Ingredients() {
  const [userIngredients, dispatch] = useReducer(ingredientReducer, [])
  const [httpState, dispatchHttps] = useReducer(httpsStateReducer, [{ error: null, loading: false }])

  
  const loadedIngredientsHandler = useCallback((filteredIngredients) => {
    
    dispatch({ type: 'SET', ingredients: filteredIngredients })
  }, [])
  // useCallback will not re-render this function 
  const addIngredientHandler = useCallback(ingredient => {
    dispatchHttps({ type: 'SEND' })
    try {
      fetch('https://react-hooks-project-45dcb-default-rtdb.firebaseio.com/ingredients.json', {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => {
        console.log(response)
        return response.json().then()
      })
        .then(responseData => {
          dispatchHttps({ type: 'RESPONSE' })
          dispatch({ type: 'ADD', ingredient: { id: responseData.name, ...ingredient } })
        })
        .catch(err => {
          dispatchHttps({ type: 'ERROR', error: err.message })
          
        })
    }
    catch (e) {
      console.log("error in catch", e)
    }




  },[]) 
  const removeIngredientHandler = useCallback((id) => {
    dispatchHttps({ type: 'SEND' })
    fetch(`https://react-hooks-project-45dcb-default-rtdb.firebaseio.com/ingredients/${id}.json`, {
      method: 'DELETE'
    }).then((response) => {
      dispatch({ type: 'DELETE', id: id })
      dispatchHttps({ type: 'RESPONSE' })
    })
      .catch(err => {
        dispatchHttps({ type: 'ERROR', error: err.message })
      })
  }
  ,[])
  const clearError = () => {
    dispatchHttps({ type: 'CLEAR_ERROR' })
  }
  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />

      <section>
        <Search onLoadIngredients={loadedIngredientsHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={(id) => { removeIngredientHandler(id) }} />
      </section>
    </div>
  );
}

export default Ingredients;

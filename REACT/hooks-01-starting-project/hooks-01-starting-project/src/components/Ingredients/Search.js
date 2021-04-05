import React ,{useState, useEffect, useRef}from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const {onLoadIngredients} = props
  const [EnteredFilter,setEnteredFilter] = useState('')
  const inputRef = useRef();
  useEffect(()=>{
    const timer = setTimeout(()=>{
      if(EnteredFilter === inputRef.current.value)
      {
        const query = EnteredFilter.length===0
        ?''
        :`?orderBy="title"&equalTo="${EnteredFilter}"`
        
        fetch('https://react-hooks-project-45dcb-default-rtdb.firebaseio.com/ingredients.json'+query)
        .then(response=>response.json())
        .then(responseData=>{
          const loadedIngredients = []
          console.log(query,responseData)
          for(const key in responseData){
            loadedIngredients.push(
              {
                id:key,
                title:responseData[key].title,
                amount:responseData[key].amount
              }
            )
          }
          props.onLoadIngredients(loadedIngredients)
        })
      }
    },500)
   return ()=>{
    clearTimeout(timer)
   }
  },[EnteredFilter,onLoadIngredients,inputRef])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" 
          ref = {inputRef}
          value={EnteredFilter}
          onChange={(event)=>{
            setEnteredFilter(event.target.value)
          }}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;

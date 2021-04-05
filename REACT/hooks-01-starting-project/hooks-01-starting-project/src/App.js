import React, { useContext, useEffect } from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from './components/Auth'
import AuthContextProvider, {AuthContext} from './context/authContext'
import IngredientList from './components/Ingredients/IngredientList';
const App = props => {
  const context = useContext(AuthContext)
  let content = <Auth />
  if(context.isAuth)
  {
    content = <Ingredients />
  }
  return content;
};

export default App;

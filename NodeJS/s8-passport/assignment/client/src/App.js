import './App.css';
import {Switch, Route} from 'react-router-dom'
import Welcome from './components/Welcome/welcome'
import LoginForm from './container/LoginForm/LoginForm'
function App() {
  return (
    <>  
    <LoginForm />
    <Route path='/login-failure'>
      <div>Dail</div>
    </Route>
    <Route path='/success-login'component={Welcome} />

</>
  );
}

export default App;

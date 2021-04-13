
import { useEffect } from "react";
import axios from 'axios'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const url = 'http://localhost:9999'
const config = {
  method: 'get',
  url: 'http://localhost:9999',
  headers: { 'Content-Type': 'text/plain' }
}

export default function App() {
  useEffect(() => {
    axios(config)
    .then(res=>console.log(res))
    .then(newres=>console.log(newres))
    .catch(err=>console.log(err))
  })
    return (
      <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }

function Home() {
      return <h2>Home</h2>;
    }

function About() {
      return <h2>About</h2>;
    }

function Contact() {
      return <h2>Contact</h2>;
    }
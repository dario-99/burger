import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Import Style
import './App.css'

// Import components
import Header from './/Header/Header'
import Tavolo from './Tavolo/Tavolo'
import Nav from './Nav/Nav'
import Menu from './Menu/Menu'

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Switch>
                    <Route path="/" exact component={Tavolo} />
                    <Route path="/Menu" component={Menu} />
                </Switch>
            </div>
        </Router>
    )
}

export default App;
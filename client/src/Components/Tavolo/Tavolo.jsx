import React from 'react'
import { Link } from 'react-router-dom';

//Import Style
import './Tavolo.css'

function Tavolo() {

    return (
        <div className="Tavolo">
            <div className="Tavolo-page-title">
                <h1 id="title--text"> Tavolo </h1>
            </div>
            <div className="Tavolo-Buttons">
                <Link id="--Links" to="/Menu"><h3 id="--B" > Menu </h3></Link>
                <Link id="--Links" to="/Riepilogo"><h3 id="--B" > Riepilogo Ordine </h3></Link>
                <Link id="--Links" to="/Conto"><h3 id="--B" > Conto </h3></Link>
            </div>
        </div>
    )
}

export default Tavolo;
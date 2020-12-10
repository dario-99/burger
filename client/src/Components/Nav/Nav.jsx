import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'
import './Nav.css'

function NavBar() {

    return (
            <div className="Nav-Bar">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <Link to={'/Menu/Antipasti'} className="nav-link active">ANTIPASTI</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Menu/Panini'} className="nav-link active">PANINI</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Menu/Bibite'} className="nav-link active">BIBITE</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Menu/Birre'} className="nav-link active">BIRRE</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/Menu/Dolci'} className="nav-link active">DOLCI</Link>
                    </li>
                </ul>
            </div>
    );
}

export default NavBar;
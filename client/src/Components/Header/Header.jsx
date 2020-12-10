import React from 'react'
import { Link } from 'react-router-dom';

import './Header.css'

function Header() {

    return(
        <header className="Tavolo-page-head">
            <img id="page-head--BM" src="./Assets/BM.png" alt="Diomerda" />
            <Link id="--Links" to="/"><img id="page-head--PLH" src="./Assets/Placeholder.png" alt="Diomerda" /></Link>
            <img id="page-head--SCNR" src="./Assets/Scontrino.png" alt="Diomerda" />
        </header>
    )

}

export default Header;
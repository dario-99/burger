import React from 'react'
import ReactDOM from 'react-dom'

// Import Index 

import App from './Components/App'

function Index() {
    return(
        <div>
            <App />
        </div>
    )
}

ReactDOM.render(<Index />, document.getElementById('root'))
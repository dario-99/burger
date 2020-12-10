import React, {Component} from 'react';
// Import Style
import './Menu.css'
//Import component
import Nav from '../Nav/Nav'

const Menujson = {
    "menu" : [
        {
            "nome": "pollo",
            "prezzo": 20,
            "descrizione": "pollo rotto in culo",
            "tipo": "antipasto",
            "indicatori": [
                "piccante",
                "vegano"
            ]
        },
        {
            "nome": "Speck e Formaggio",
            "prezzo": 8,
            "descrizione": "Speck arrotolato con Formaggio caprino demoniaco",
            "tipo": "antipasto",
            "indicatori": [
                "piccante",
                "vegano"
            ]
        }
    ]
}

class Menu extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // Qui andra caricata la menu response
            Menu_array: []
        }

    }
    componentDidMount(){
        console.log("pollo didMount");
        fetch('/api/getMenu')
            .then(res => res.json())
            .then(menu => this.setState({Menu_array:menu}, ()=> console.log("sfetcho da 3", this.state.Menu_array)))
            .catch(err => {
                console.log("diomerda errore: ", err)
            })
    }
    /* componentDidMount() {
        fetch('/api/getMenu')
            .then(response => {
                console.log(response.json);
            })
            .catch(err => {
                console.log("diomerda errore: ", err)
            })
    } */
    render() {
        console.log("pollo render");
        var menu = this.state.Menu_array;
        console.log("render menu",this.state.Menu_array);
        return (
            <div className="Menu">
                <Nav />
                <div className="Menu_container">
                    {
                        this.state.Menu_array.length != 0  ? this.state.Menu_array.menu.map(pietanza =>
                            <div key={pietanza.nome}>
                                <h1>{pietanza.nome}</h1>
                                <h3>{pietanza.descrizione}</h3>
                                <h3>{pietanza.prezzo}</h3>
                                <ul>
                                    <li style={{display: pietanza.indicatori[0] ? "" : "none"}}>{pietanza.indicatori[0]}</li>
                                    <li style={{display: pietanza.indicatori[1] ? "" : "none"}}>{pietanza.indicatori[1]}</li>
                                    <li style={{display: pietanza.indicatori[2] ? "" : "none"}}>{pietanza.indicatori[2]}</li>
                                </ul>
                            </div>
                            //console.log("siamno stronzi", pietanza)
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

export default Menu;


import React, { Component } from 'react';

class MiComponente extends Component {
    render() {

        let receta = {
            nombre: 'Pizza',
            ingredientes: ['Tomate', 'Queso', 'Jamon cocido', 'Oregano'],
            calorias: 400
        };
        return (
            <div className="mi-componente">
                <h1>{'Receta: ' + receta.nombre}</h1>
                <h2>{'Calorias: ' + receta.calorias}</h2>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            // console.log(ingrediente);
                            return (
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            )
                        })
                    }
                </ol>
                <hr />
            </div>

        );
    }

}

export default MiComponente;
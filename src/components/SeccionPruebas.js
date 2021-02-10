import React, { Component } from 'react';

// IMPORTAR COMPONENTES 
import MiComponente from './MiComponente';
import Peliculas from './Peliculas';

class SeccionPruebas extends Component {

    contador = 0;
    // DEFINIR ESTADOS FORMA LARGA
    /*constructor(props) {
        super(props);

        this.state = {
            contador: 0
        };
    }*/
    // DEFINIR ESTADOS FORMA CORTA
    state = {
        contador: 0
    };


    HolaMundo(nombre, edad) {
        var presentacion = (
            <div>
                <h2>Hola, soy {nombre}</h2>
                <h3>Tengo {edad} años</h3>
            </div>);

        return presentacion;
    }

    sumar = () => {
        this.setState({
            contador: (this.state.contador + 1)
        });
    }

    restar = () => {
        this.setState({
            contador: (this.state.contador - 1)
        });
    }

    render() {
        var nombre = 'Eduardo Torres';
        return (
            <section id="content">
                <h2 className="subheader">Últimos articulos</h2>

                <p>
                    Hola bienvenido al porfolio React de Eduardo Torres !!
                </p>
                <h2 className="subheader">Funciones y JSX basico</h2>
                {this.HolaMundo(nombre, 39)}

                <h2 className="subheader">Componentes</h2>
                <section className="componentes">

                    <MiComponente />
                    <Peliculas />

                </section>

                <h2 className="subheader">Estados</h2>
                <p>
                    Contador: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar} />
                    <input type="button" value="Restar" onClick={this.restar} />
                </p>

            </section>
        );
    }

}

export default SeccionPruebas;
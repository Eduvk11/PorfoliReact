// CORE
import React, { Component } from 'react';

// COMPONENTES
import Sidebar from './Sidebar';


class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    bioRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtrorRef = React.createRef();

    state = {
        user: {}
    };

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = 'hombre';

        if (this.generoHombreRef.current.checked) {
            genero = this.generoHombreRef.current.value;
        } else if (this.generoMujerRef.current.checked) {
            genero = this.generoMujerRef.current.value;
        } else {
            genero = this.generoOtrorRef.current.value;
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            bio: this.bioRef.current.value,
            genero: genero

        };

        this.setState({
            user: user
        });

        console.log('Formulario enviado ¡¡');
        console.log(user);

    }
    render() {

        if (this.state.user.nombre) {
            var user = this.state.user;
        }

        return (
            <React.Fragment>
                <div id='formulario'>
                    <div className="center">
                        <div id="content">
                            <h1 className="subheader">Formulario</h1>
                            {/* Mostrar datos del formulario */}
                            {this.state.user.nombre &&
                                <div id="user-data">
                                    <p>Nombre: <strong>{user.nombre}</strong></p>
                                    <p>Apellidos: <strong>{user.apellidos}</strong></p>
                                    <p>Bio: <strong>{user.bio}</strong></p>
                                    <p>Genero: <strong>{user.genero}</strong></p>
                                </div>
                            }



                            {/* Crear formulario */}
                            <form className="mid-form" onSubmit={this.recibirFormulario}>
                                <div className="form-grup">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" name="nombre" ref={this.nombreRef} />
                                </div>
                                <div className="form-grup">
                                    <label htmlFor="nombre">Apellidos</label>
                                    <input type="text" name="Apellidos" ref={this.apellidosRef} />
                                </div>
                                <div className="form-grup">
                                    <label htmlFor="nombre">Biografia</label>
                                    <textarea name="bio" ref={this.bioRef} ></textarea>
                                </div>
                                <div className="form-grup radiobuttons">
                                    <input type="radio" name="genero" value="Hombre" ref={this.generoHombreRef} />Hombre
                                    <input type="radio" name="genero" value="Mujer" ref={this.generoMujerRef} />Mujer
                                    <input type="radio" name="genero" value="Otro" ref={this.generoOtroRef} />Otro
                                </div>
                                <div className="clearfix"></div>
                                <input type="submit" value="Enviar" className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default Formulario;
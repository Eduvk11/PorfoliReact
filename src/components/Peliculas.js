// CORE
import React, { Component } from 'react';
// COMPONENTES
import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';
// IMAGENES
// import Batman from '../assets/images/Batman.jpg';
// import Spiderman from '../assets/images/Spiderman.jpeg';
// import vengadores from '../assets/images/vengadores.jpg';
// import WonderWoman from '../assets/images/WonderWoman.jpg';


class Peliculas extends Component {
    state = {};

    cambiarTitulo = () => {
        var { peliculas } = this.state;
        // var random = Math.floor(Math.random() * 4);
        peliculas[0].titulo = 'Batman begins';


        this.setState({
            peliculas: peliculas
        });
    }
    favorita = (pelicula) => {
        console.log('Favorita marcada');
        console.log(pelicula);

        this.setState({
            favorita: pelicula
        });
    }
    //ciclos de vida: antes de montar el componente
    componentWillMount() {
        //  alert('se va ha montar el componente')
        this.setState({
            peliculas: [
                { titulo: 'Batman vs Superman', image: "https://hipertextual.com/files/2014/05/batman-vs-superman-dawn-of-justice.jpg?width=1200&enable=upscale" },
                { titulo: 'Spiderman', image: 'https://i.pinimg.com/originals/42/8c/7d/428c7dc836c7284f94e5cebc31c18574.jpg' },
                { titulo: 'Los vengadores', image: 'https://lamanodelextranjero.files.wordpress.com/2019/05/los-vengadores-contra-thanos-en-infinity-war.jpg' },
                { titulo: 'WonderWoman', image: 'http://es.web.img3.acsta.net/pictures/20/12/23/12/39/0017180.jpg' }
            ],
            nombre: 'Eduardo Torres',
            favorita: {}
        });
    }
    //ciclos de vida: ya ha cargado todos los datos del componente
    componentDidMount() {
        //alert('ya se ha montado el componente')
    }
    //ciclos de vida: Final del componente
    componentWillUnmount() {
        //alert('Me voy a desmontar')
    }

    //ciclos de vida: se muestra el componente
    render() {
        return (
            <React.Fragment>
                <Slider
                    title="Películas"
                    size="slider-small"
                />

                <div className="center">
                    <div id="content" className="peliculas">

                        <h2 className="subheader">Listado de películas</h2>
                        <p>Seleccion de las peliculas favoritas de {this.state.nombre}</p>
                        <p><button onClick={this.cambiarTitulo} >Cambiar titulo </button></p>

                        {/* Condicional, si existe 'favorita' lo muestras
                    && = if. Para ejecutar un else se utiliza las condicionales ternarias */}
                        {this.state.favorita.titulo ? (
                            <p className="favorita">
                                <strong>La pelicula favorita es: </strong>
                                <span>{this.state.favorita.titulo}</span>
                            </p>

                        ) : (
                                <p>No hay pelicula favorita</p>
                            )
                        }


                        {/*CREAR COMPONENTE PELICULA*/}
                        <div id="articles" className="pelicilas">
                            {
                                this.state.peliculas.map((pelicula, i) => {
                                    return (
                                        <Pelicula
                                            key={i}
                                            pelicula={pelicula}
                                            indice={i}
                                            marcarFavorita={this.favorita}
                                        />
                                    )
                                })
                            }
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

export default Peliculas;
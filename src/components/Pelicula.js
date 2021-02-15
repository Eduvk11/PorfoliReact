import React, { Component } from 'react';

class Pelicula extends Component {
    render() {
        const { titulo, image } = this.props.pelicula;
        const pelicula = this.props.pelicula;

        return (
            <article className="article-item" id="article-template">
                <div className="image-wrap">
                    <img src={image} alt={titulo} />
                </div>
                <h2>{titulo}</h2>
                <span className="date">
                    Hace 5 minutos
                </span>
                <a href="article.html">Leer más</a>
                <button onClick={() => { this.props.marcarFavorita(pelicula) }}>
                    Marcar como favorita
                </button>
                <div className="clearfix"></div>
            </article>
        )

    }
}

export default Pelicula;
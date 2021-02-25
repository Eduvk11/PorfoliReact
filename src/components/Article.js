// CORE
import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import Moment from 'react-moment';
import 'moment/locale/es';
import swal from 'sweetalert';

// COMPONENTES
import Sidebar from './Sidebar';
// IMAGENES
import imageDefault from '../assets/images/defaul.png';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }


    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {

        var id = this.props.match.params.id;

        axios.get(this.url + '/article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            })
            .catch(err => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            })
    }

    deleteArticle = (id) => {

        swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, ¡no podrá recuperar este archivo!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    axios.delete(this.url + '/article/' + id)
                        .then(res => {
                            this.setState({
                                article: res.data.article,
                                status: 'deleted'
                            });

                        })

                    swal("¡Poof! ¡Tu archivo ha sido eliminado!", {
                        icon: "success",
                    });
                } else {
                    swal("¡Tu archivo esta a salvo!");
                }
            });


    }

    render() {

        if (this.state.status === 'deleted') {
            return <Redirect to='/blog' />
        }

        var article = this.state.article;
        return (
            <div className="center">
                <section id="content">

                    {this.state.article &&

                        <article className="article-item article-detail">
                            <div className="image-wrap">
                                {
                                    article.image != null ? (
                                        <img src={this.url + '/get-image/' + article.image} alt={article.title} />
                                    ) : (
                                            <img src={imageDefault} alt={article.title} />
                                        )
                                }

                            </div>
                            <h1 className="subheader">{article.title}</h1>
                            <span className="date">
                                <Moment locale='es' fromNow>{article.date}</Moment>
                            </span>
                            <p>
                                {article.content}
                            </p>
                            <Link to={'/blog/editar/' + article._id} className="btn btn-warning">Editar</Link>
                            <button onClick={() => { this.deleteArticle(article._id) }} className="btn btn-danger">Borrar</button>

                            <div className="clearfix"></div>

                        </article>
                    }

                    {!this.state.article && this.state.status === 'success' &&
                        <div id='article'>
                            <h2 className='subheader'>El árticulo no existe</h2>
                            <p>Intentalo de nuevo más tarde</p>
                        </div>
                    }

                    {!this.state.status == null &&
                        <div id='article'>
                            <h2 className='subheader'>Cargando...</h2>
                            <p>Espere unos segundos</p>
                        </div>
                    }

                </section>
                <Sidebar />
                <div className="clearfix"></div>
            </div>
        );
    }
}

export default Article;
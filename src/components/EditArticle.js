// CORE
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

// COMPONENTES
import Sidebar from './Sidebar';
// IMAGENES
import imageDefault from '../assets/images/defaul.png';

// 1. Recoger id del articulo a editar
// 2. Crear metodo para sacar ese objeto del backend
// 3. Repoblar/ rellenar el formulario con esos datos
// 4. Actualizar el objeto haciendo una peticion al backend

class EditArticle extends Component {

    url = Global.url;
    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: [],
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        SimpleReactValidator.addLocale('es', {
            alpha_num_space: 'El título solo puede contener letras, números y espacios.',
            required: 'El campo es requerido'
        });
        this.validator = new SimpleReactValidator({ locale: 'es' });

    }

    getArticle = (id) => {
        axios.get(this.url + '/article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                });
            });

    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });
    }
    saveArticle = (e) => {
        e.preventDefault();
        // Rellenar state con formulario
        this.changeState();

        if (this.validator.allValid()) {
            // Hacer una peticion http por post para guardar el articulo
            axios.put(this.url + '/article/' + this.articleId, this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Árticulo editado',
                            'El árticulo ha sido editado correctamente',
                            'success'
                        );

                        // Subir la imagen
                        if (this.state.selectedFile !== null) {
                            // Sacar el id del articulo guardado
                            var articleId = this.state.article._id;

                            //Crear form data y añadir fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            //Peticion ajax
                            axios.post(this.url + '/upload-image/' + articleId, formData)
                                .then(res => {
                                    if (res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                });

                        } else {
                            this.setState({
                                status: 'success'
                            });
                        }

                    } else {
                        this.setState({
                            status: 'failed'
                        });
                    }
                })
        } else {
            this.setState({
                status: 'failed'
            });

            this.validator.showMessages({ locale: 'es' });
            this.forceUpdate();
        }
    }

    fileChange = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    }

    render() {
       // console.log(this.state.article)

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />;
        }
        var article = this.state.article;
        return (
            <div className='center' >
                <section id='content'>
                    <h1 className='subheader'>Editar articulo</h1>

                    {this.state.article &&

                        <form className="mid-form" onSubmit={this.saveArticle}>
                            <div className="from-grup">
                                <label htmlFor="title">Titulo</label>
                                <input type="text" name="title" defaultValue={article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                            </div>
                            <div className="from-grup">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={article.content} ref={this.contentRef} onChange={this.changeState} ></textarea>

                                {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                            </div>
                            <div className="from-grup">
                                <label htmlFor="file0">Imagen</label>
                                <div className="image-wrap">
                                    {
                                        article.image != null ? (
                                            <img src={this.url + '/get-image/' + article.image} alt={article.title} className="image-thumb" />
                                        ) : (
                                                <img src={imageDefault} alt={article.title} className="image-thumb" />
                                            )
                                    }

                                </div>
                                <input type="file" name="file0" onChange={this.fileChange} />
                            </div>
                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    }

                    {!this.state.article &&
                        <h2 className="subheader">Cargando... </h2>
                    }

                </section>

                <Sidebar />
            </div>
        );
    }
}

export default EditArticle;
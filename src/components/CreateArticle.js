// CORE
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';
import SimpleReactValidator from 'simple-react-validator';
import swal from 'sweetalert';

// COMPONENTES
import Sidebar from './Sidebar';

// Validacion de formulario y alertas

class CreateArticle extends Component {

    url = Global.url;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: [],
        status: null,
        selectedFile: null
    };

    componentWillMount() {
        SimpleReactValidator.addLocale('es', {
            alpha_num_space: 'El título solo puede contener letras, números y espacios.',
            required: 'El campo es requerido'
        });
        this.validator = new SimpleReactValidator({ locale: 'es' });

    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value
            }
        });
    }
    saveArticle = (e) => {
        e.preventDefault();
        // Rellenar state con formulario
        this.changeState();

        if (this.validator.allValid()) {
            // Hacer una peticion http por post para guardar el articulo
            axios.post(this.url + '/save', this.state.article)
                .then(res => {
                    if (res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'waiting'
                        });

                        swal(
                            'Árticulo creado',
                            'El árticulo ha sido creado correctamente',
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

        if (this.state.status === 'success') {
            return <Redirect to="/blog" />;
        }

        return (
            <div className='center' >
                <section id='content'>
                    <h1 className='subheader'>Crear articulo</h1>

                    <form className="mid-form" onSubmit={this.saveArticle}>
                        <div className="from-grup">
                            <label htmlFor="title">Titulo</label>
                            <input type="text" name="title" ref={this.titleRef} onChange={this.changeState} />

                            {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}
                        </div>
                        <div className="from-grup">
                            <label htmlFor="content">Contenido</label>
                            <textarea name="content" ref={this.contentRef} onChange={this.changeState} ></textarea>

                            {this.validator.message('content', this.state.article.content, 'required|alpha_num_space')}
                        </div>
                        <div className="from-grup">
                            <label htmlFor="file0">Imagen</label>
                            <input type="file" name="file0" onChange={this.fileChange} />
                        </div>
                        <input type="submit" value="Guardar" className="btn btn-success" />
                    </form>
                </section>

                <Sidebar />
            </div>
        );
    }
}

export default CreateArticle;
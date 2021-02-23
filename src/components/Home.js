import React, { Component } from 'react';

// CCOMPONENTES
import Slider from './Slider';
import Sidebar from './Sidebar';
import Articles from './Articles';

class Home extends Component {

    render() {

        return (
            <div id='Home'>
                <Slider
                    title="Bienvenido al porfolio de Eduardo Torres con React"
                    btn='IR al blog'
                    size="slider-big"
                />
                <div className='center'>
                    <div id='content'>
                        <h1 className='subheader'>Últimos árticulos</h1>
                        <Articles
                            home='true'
                        />
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;
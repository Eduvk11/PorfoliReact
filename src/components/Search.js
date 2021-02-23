// CORE
import React, { Component } from 'react';

// COMPONENTES
import Sidebar from './Sidebar';
import Slider from './Slider';
import Articles from './Articles';

class Search extends Component {
    render() {
        var searched = this.props.match.params.search;

        return (
            <div id='blog' className="slider-small" >
                <Slider
                    title={"Busqueda: " + searched}
                    size="slider-small"
                />
                <div className='center'>
                    <div id='content'>
                        {/* LISTADO DE ARTICULOS QUE VENDRAN DE LA API RES DE NODE */}
                        <Articles
                            search={searched}
                        />
                    </div>
                    <Sidebar
                        blog="true"
                    />
                </div>
            </div>
        );
    }
}

export default Search;
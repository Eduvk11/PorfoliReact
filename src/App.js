import React from 'react';
import './assets/css/App.css';

// IMPORTAR COMPONENTES

import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SeccionPruebas from './components/SeccionPruebas';




function App() {
  var buttonString = "Ir al blog";

  return (
    <div className="App">
      <Header />

      <Slider
        title="Bienvenido al porfolio de Eduardo Torres con React"
        btn={buttonString}
      />

      <div className='center'>
        <SeccionPruebas />

        <Sidebar />
        <div className="clearfix"></div>
      </div>
      <Footer />
    </div >
  );
}

export default App;
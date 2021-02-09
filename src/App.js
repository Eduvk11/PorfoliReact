import React from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/App.css';

// IMPORTAR COMPONENTES
import MiComponente from './components/MiComponente';

function holaMundo(nombre, edad) {
  var presentacion = (
    <div>
      <h2>Hola, soy {nombre}</h2>
      <h3>Tengo {edad} años</h3>
    </div>);

  return presentacion;
}

function App() {

  var nombre = 'Eduardo Torres';

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hola bienvenido al porfolio React de Eduardo Torres !!
    </p>
        {holaMundo(nombre, 39)}
        <section className="componentes">
          <MiComponente />

        </section>
      </header>


    </div>
  );
}

export default App;
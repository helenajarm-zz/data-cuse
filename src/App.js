import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'leaflet/dist/leaflet.css'
import MapComponent from './map.js'




class App extends Component {

  render() {
    return (
        <MapComponent />

    );
  }
}

export default App;

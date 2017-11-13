import React, {Component} from 'react';
import { render } from 'react-dom';
import { Map, Marker, Popup, TileLayer, GeoJSON, MapControl } from 'react-leaflet';
import mapData from './geo.js';
//import CenterControl from './centercontrol.js';


class MapComponent extends Component {
  constructor() {
    super();
    this.state = {
      lat: 43.0481,
      lng: -76.1474,
      zoom: 12,
      open: false,
      fillColor: 'white',
    };

  }


 getPercentageColor = (c) => {
    //  const c = ((a / b) * 100);
    //  console.log (c);
     return c > 9  ? '#980043' :
            c > 7  ? '#dd1c77' :
            c > 5  ? '#df65b0' :
            c > 3   ? '#d7b5d8' :
            c > 2   ? '#f1eef6' :
                       '#fef0d9' ;
 }


  getStyle = (kjh) => {
    return {
      fillColor: this.getPercentageColor(kjh.properties.unemployment/kjh.properties.population*100),
      color: 'black',
      weight: 2,
      opacity: .10,
      fillOpacity: 0.7,
    }
  }

  highlightFeature(e) {
      var layer = e.target;
      layer.setStyle({
         opacity: 1,
      });
  }

  resetHighlight(e) {
    var layer = e.target;
    layer.setStyle({
       opacity: .10,
    });
  }


  onEachFeature = (feature, layer) => {
    var copy = Math.floor(feature.properties.unemployment/feature.properties.population*100);

    layer.on({
      mouseover: this.highlightFeature,
      mouseout: this.resetHighlight,
      click: layer.bindPopup(copy+'% of people here are unemployed.'),
   });

}


  render () {
    const position = [this.state.lat, this.state.lng];

   return(
       <Map center={position} zoom={this.state.zoom} id={'mapid'}>

         <TileLayer
           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
           url='https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGVsZW5hamFybSIsImEiOiJjajhka2treG0wa200MnhtajZ0OTN2MGdnIn0.sWgy_IayoCTY0PpGnKZOVA'
         />
         <GeoJSON data={mapData} style={this.getStyle} onEachFeature={this.onEachFeature}/>

       </Map>
  );
  }
}
export default MapComponent;

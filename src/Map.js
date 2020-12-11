import React from 'react'
import './Map.css';
import {MapContainer as LeafletMap, TileLayer } from 'react-leaflet'

function Map({countries, center, zoom}) {
    return (
        <div className="map">
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
               
            </LeafletMap>
        </div>
    )
}

export default Map 


/* import React from "react";
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';  
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({center, zoom }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      
      </LeafletMap>
    </div> 
  );
}

export default Map; */


/* curl -X GET "https://disease.sh/v3/covid-19/countries" -H "accept: application/json"
`https://disease.sh/v3/covid-19/countries/${countryCode}`
https://disease.sh/v3/covid-19/all
https://disease.sh/v3/covid-19/historical/all?lastdays=120

npm i react-chartjs-2
npm i react-chartjs-2 chart.js  for graph
npm i react-leaflet  for maps

import React,{useState, useEffect}from 'react'
import line from 'react-chartjs-2';
import numeral from "numeral"; 
npm install -g firebase-tools 
*/ 
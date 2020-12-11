import logo from './logo.svg';
import React ,{useState, useEffect} from "react"
import './App.css';
import {MenuItem, FormControl, Select, Card, CardContent} from "@material-ui/core";
import InfoBox from './InfoBox';
import Map from './Map'; 
import Table from './Table';
import {sortData, prettyPrintStat} from './util';
import LineGraph from './LineGraph';   
import "./LineGraph.css";
import { Dropdown } from 'semantic-ui-react'
import SelectSearch from 'react-select-search';
/* import 'leaflet/dist/leaflet.css';   */     
import CountryData from './CountryData';
import SimpleModal from './SimpleModal';
import About from './About';
import Home from './Home'; 
import Dashboard from './Dashboard'; 
import { makeStyles } from '@material-ui/core/styles'; 
import Modal from '@material-ui/core/Modal'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";   


 
function App() { 

  const [countries ,setCountries] = useState([]);
  const [country ,setCountry] = useState('worldwide');  
  const [countryInfo ,setCountryInfo] = useState({});
  const [tableData ,setTableData] = useState([]); 
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] =useState([]);



  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[]);

  useEffect(() => {
    // async request made, promise will be returned
    const getCountriesData = async() => {
      await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {

        const countries = data.map((country) => ({
          name:  country.country,
          value : country.countryInfo.iso2
        }));

        const sortedData = sortData(data);
        setTableData(sortedData); 
        setMapCountries(data);
        setCountries(countries); 
        
      })
    }
    
    getCountriesData(); 
  }, []);

    const onCountryChange  = (event) => {
    const countryCode = event.target.value;
    //console.log(countryCode); 
    setCountry(countryCode); 

    /* =============== */
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
/* =============== */
    
    const url = countryCode === 'worldwide' ?
    'https://disease.sh/v3/covid-19/all' :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  
      fetch(url)
     .then(response => response.json())
     .then(data => {
       setCountry(countryCode); 
       setCountryInfo(data); // All data from 1 country response
      /*  setMapCenter([data.countryInfo.lat,data.countryInfo.long]); */
       setMapZoom(4);

     });

  };

  



  

 console.log("countryInfo :", countryInfo); 
 

  return (
    <div className="app"> 

      <div className="app__left">
       
      <div className="app__header">  
      <h2>COVID-19 Tracker</h2> 
 
       <SimpleModal/>

 
      
      <FormControl className = "app_dropdown">
        <Select  variant="outlined" value={country} onChange={onCountryChange} >
          {/* Loop through all countries */}
          <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map ((country) => (
            <MenuItem value={country.value} >{country.name}</MenuItem> 
          /*   <Link to="/CountryData" value={country.value} onClick={alertPopUp}>{country.name}</Link>  */
            ))}   
            {/* <MenuItem value="1">a</MenuItem>*/}    
        
       </Select > 
       
        
 
       {/* <Select variant="outlined" value={country} onChange={onCountryChange} >
         <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map ((country) => (
             <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}   
       </Select> */}

        

      </FormControl> 
      </div>

      <div className ="app__stats">
          {/* Infoboxs */}
          <InfoBox isRed active={casesType === "cases"} onClick={e => setCasesType('cases')} title="Coranvirus Cases" cases={prettyPrintStat(countryInfo.todayCases)} total={prettyPrintStat(countryInfo.cases)}/>
          <InfoBox active={casesType === "recovered"}  onClick={e => setCasesType('recovered')} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={prettyPrintStat(countryInfo.recovered)}/>
          <InfoBox isRed active={casesType === "deaths"}  onClick={e => setCasesType('deaths')} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={prettyPrintStat(countryInfo.deaths)}/> 
      </div>

       {/* <Map countries={mapCountries}  center={mapCenter} zoom={mapZoom}/>  */}  
       <h2 className="app__header">Graphical Representation across Dates</h2>
       <LineGraph casesType={casesType} className='LineGraph'/> <br></br>
      </div>
 
      <Card className='app__right'> 
       <CardContent>
         <h3>Live Cases by Country</h3>
         <Table countries={tableData}/>
         <h3>WideWide New Cases</h3>
          {/* <LineGraph/> */} 
         {/*  <LineGraph casesType={casesType} /> */}
       </CardContent> 
      </Card>
     
    </div>  
  );
}

export default App;

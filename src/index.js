import React, { Component } from 'react';
import render from 'react-dom';

import Header from './components/Header';
import Filter from './components/Filter';
import YaMap from './components/YaMap';
import Results from './components/Results';
import Popup from './components/Popup';
import InfoBlock from './components/InfoBlock';

import './css/bootstrap-grid.min.css';
import './css/main.css';

import dataApp from './data/dataApp.json';
import dataDistrict from './data/dataDistrict.json';
import dataType from './data/dataType.json';

import registerServiceWorker from './registerServiceWorker';

class App extends Component {
  constructor() {
    super();
    this.state = {
      district: {
        open: false,
        select: '',
        data: dataDistrict,
        displayed: []
      },
      type: {
        open: false,
        select: '',
        data: dataType,
        displayed: []
      },
      adress: '',
      data: dataApp,
      displayedData: [],
      resultOpen: true,
      selectObjectId: -1,
      infoBlockOpen: false
    }
  }

  handleSelectSearch = event => {
		const query = event.target.value;
    const select = event.target.id;
    const displayed = [];
    const data = select === 'district' ? dataDistrict : dataType;
		data.filter(el => {
      const searchValue = el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      if(searchValue) {
        displayed.push(el);
      }
    });
    if( select === 'district' ) {
      const open = query ? true : false;
      const district = { ...this.state.district, open, select: query, displayed }
      this.setState({ district });
    }
    if( select === 'type' ) {
      const open = query ? true : false;
      const type = { ...this.state.type, open, select: query, displayed }
      this.setState({ type });
    }
  }
  
  handleSelectClick = (select, settings) => {
    const open = false;
    if( select === 'district' ) {
      const displayed = this.state.district.data;
      const district = { ...this.state.district, open, select: settings, displayed }
      this.setState({ district });
    }
    if( select === 'type' ) {
      const displayed = this.state.type.data;
      const type = { ...this.state.type, open, select: settings, displayed }
      this.setState({ type });
    }
  }

  handleSelectOpen = select => {
    if( select === 'district' ) {
      const open = !this.state.district.open;
      const district = { ...this.state.district, open }
      this.setState({ district });
    }
    if( select === 'type' ) {
      const open = !this.state.type.open;
      const type = { ...this.state.type, open }
      this.setState({ type });
    }
  }

  handleFilterSearch = () => {
    const district = this.state.district.select !== dataDistrict[0].name ? this.state.district.select : false;
    const type = this.state.type.select !== dataType[0].name ? this.state.type.select : false;
    const adress = this.state.adress;
    const data = dataApp;
    let displayedData = [];

    if( adress ) {
      window.ymaps.ready(() => {
        var myGeocoder = window.ymaps.geocode(adress, { 
          boundedBy: [[56.232695, 36.406029],[55.133578, 38.757517]],
          strictBounds: true
        });
        myGeocoder.then(res => {
            const coords = res.geoObjects.get(0).geometry.getCoordinates();
            const newData = [];
            data.map((el, i) => {
              const rast = Math.sqrt((el.lat - coords[0])*(el.lat - coords[0]) + (el.lon - coords[1])*(el.lon - coords[1]));
              newData.push({ id: i, rast });
            });
            newData.sort((a, b) => a.rast - b.rast);
            if( type ) {
              var T = 10;
              for( let i = 0 ; i < dataApp.length ; i++ ) {
                if( dataApp[newData[i].id].zone_type === type && T !== 0 ) {
                  displayedData.push(dataApp[newData[i].id]);
                  T--;
                }
              }
            } else {
              for ( var i = 0 ; i < 10 ; i++ ) {
                displayedData.push(dataApp[newData[i].id]);
              }
            }
            if(displayedData.length === 0) this.handleInfoBlockToggle('open');
            this.setState({ displayedData });
          }, err => {
            console.log('Ошибка');
          }
        );
      });
    } else if( district ) {
      data.map((el, i) => {
        if( type ) {
          if(el.district === district && el.zone_type === type) displayedData.push(el);
        } else {
          if(el.district === district) displayedData.push(el);
        }
      });
      if( displayedData.length === 0 ) this.handleInfoBlockToggle('open');
      this.setState({ displayedData });
    } else if( type ) {
      data.map((el, i) => {
        if(el.zone_type === type) displayedData.push(el);
      });
      if( displayedData.length === 0 ) this.handleInfoBlockToggle('open');
      this.setState({ displayedData });
    } else {
      this.handleFilterReset();
    }
  }

  handleFilterReset = () => {
    const district = {
      open: false,
      select: '',
      data: dataDistrict,
      displayed: []
    };

    const type = {
      open: false,
      select: '',
      data: dataType,
      displayed: []
    };

    const adress = '';
    const displayedData = [];
    const resultOpen = true;
    const selectObject = {};
    const popupOpen = false;

    this.setState({ 
      district,
      type,
      adress,
      displayedData,
      resultOpen,
      selectObject,
      popupOpen
    });
  }

  handleSelectAdress = event => {
    this.setState({ adress: event.target.value });
  }

  handleResultToggle = () => {
    const resultOpen = !this.state.resultOpen;
    this.setState({ resultOpen });
  }

  handlePopupToggle = id => {
    this.setState({ selectObjectId: id });
  }

  handleInfoBlockToggle = state => {
    if( state === 'open' )
      this.setState({ infoBlockOpen: true });
    if( state === 'close' )
      this.setState({ infoBlockOpen: false });
  }

  render() {
    const {
      district,
      type,
      adress,
      data,
      displayedData,
      resultOpen,
      selectObjectId,
      infoBlockOpen
    } = this.state;

    return [
      <Header key="Header" />,
      <Filter key="Filter"
        district={district}
        type={type}
        adress={adress}
        handleSelectOpen={this.handleSelectOpen}
        handleSelectSearch={this.handleSelectSearch}
        handleSelectClick={this.handleSelectClick}
        handleSelectAdress={this.handleSelectAdress}
        handleFilterSearch={this.handleFilterSearch}
        handleFilterReset={this.handleFilterReset} />,
      <YaMap key="YaMap"
        data={data}
        displayedData={displayedData}
        selectObjectId={selectObjectId}
        handlePopupToggle={this.handlePopupToggle} />,
      <Results key="Results"
        displayedData={displayedData}
        selectObjectId={selectObjectId}
        resultOpen={resultOpen}
        handleResultToggle={this.handleResultToggle}
        handlePopupToggle={this.handlePopupToggle} />,
      <Popup key="Popup"
        data={selectObjectId !== -1 ? data[selectObjectId] : {}}
        handlePopupToggle={this.handlePopupToggle} />,
      <InfoBlock key="InfoBlock"
        infoBlockOpen={infoBlockOpen}
        handleInfoBlockToggle={this.handleInfoBlockToggle} />
    ];
  }
}

render.render(<App />, document.getElementById('root'));
registerServiceWorker();

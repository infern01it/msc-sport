import React, { Component } from 'react';

import icoType1 from '../img/pin-type-1.svg';
import icoType2 from '../img/pin-type-2.svg';
import icoType3 from '../img/pin-type-3.svg';
import icoType4 from '../img/pin-type-4.svg';
import icoType5 from '../img/pin-type-5.svg';
import icoType6 from '../img/pin-type-6.svg';
import icoType7 from '../img/pin-type-7.svg';

import icoType1Active from '../img/pin-type-1-active.svg';
import icoType2Active from '../img/pin-type-2-active.svg';
import icoType3Active from '../img/pin-type-3-active.svg';
import icoType4Active from '../img/pin-type-4-active.svg';
import icoType5Active from '../img/pin-type-5-active.svg';
import icoType6Active from '../img/pin-type-6-active.svg';
import icoType7Active from '../img/pin-type-7-active.svg';

let yaMap,
    allObjects,
    searchObjects,
    allObjectsArr = [];

class YaMap extends Component {
    constructor(props) {
        super();
    }

    componentWillMount() {
        const { data, selectObjectId, handlePopupToggle = () => {} } = this.props;
        window.ymaps.ready(() => {
            yaMap = new window.ymaps.Map("yamap", {
                center: [55.76, 37.64],
                zoom: 10,
                controls: ['zoomControl']
            }, {
                searchControlProvider: 'yandex#search'
            });

            allObjects = new window.ymaps.Clusterer({
                preset: 'islands#invertedNightClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: false,
                clusterOpenBalloonOnClick: false,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
            });

            searchObjects = new window.ymaps.Clusterer({
                preset: 'islands#invertedNightClusterIcons',
                groupByCoordinates: false,
                clusterDisableClickZoom: false,
                clusterOpenBalloonOnClick: false,
                clusterHideIconOnBalloonOpen: false,
                geoObjectHideIconOnBalloonOpen: false,
            });

            data.map(el => {
                const placemark = new window.ymaps.Placemark([el.lat, el.lon], {}, {
                    iconLayout: 'default#image',
                    iconImageHref: el.id === selectObjectId ? this.iconType(el.zone_type, true) : this.iconType(el.zone_type, false),
                    iconImageSize: [30, 38],
                    iconImageOffset: [-15, -38]
                });
                placemark.events.add('click', e => {handlePopupToggle(el.id)});
                allObjects.add(placemark);
            });
            yaMap.geoObjects.add(allObjects);

        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.displayedData === nextProps.displayedData &&
            this.props.selectObjectId === nextProps.selectObjectId) {
            return false;
        } else {
            return true;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const { data, displayedData, selectObjectId, handlePopupToggle = () => {}} = nextProps;
        window.ymaps.ready(() => {
            if( displayedData.length !== 0 ) {
                yaMap.geoObjects.remove(allObjects);
                searchObjects.removeAll();
                displayedData.map(el => {
                    const placemark = new window.ymaps.Placemark([el.lat, el.lon], {}, {
                        iconLayout: 'default#image',
                        iconImageHref: el.id === selectObjectId ? this.iconType(el.zone_type, true) : this.iconType(el.zone_type, false),
                        iconImageSize: [30, 38],
                        iconImageOffset: [-15, -38]
                    });
                    placemark.events.add('click', e => {handlePopupToggle(el.id)});
                    searchObjects.add(placemark);
                });
                yaMap.geoObjects.add(searchObjects);
            }
        });
        if(this.props.displayedData !== nextProps.displayedData) {
            window.ymaps.ready(() => {
                if( displayedData.length === 0 ) {
                    yaMap.geoObjects.remove(searchObjects);
                    yaMap.geoObjects.add(allObjects);
                }
                if( displayedData.length !== 1 ) {
                    yaMap.setBounds(yaMap.geoObjects.getBounds());
                }
            });
        }
    }

    iconType(type, active) {
        switch(type) {
            case 'горнолыжный склон':
                return active ? icoType1Active : icoType1;
            case 'каток с искусственным льдом':
                return active ? icoType2Active : icoType2;
            case 'каток с натуральным льдом':
                return active ? icoType3Active : icoType3;
            case 'ледовое поле крытое':
                return active ? icoType4Active : icoType4;
            case 'площадка для керлинга крытая':
                return active ? icoType5Active : icoType5;
            case 'трасса для снегоходов, квадроциклов, ездовых упряжек и прочее':
                return active ? icoType6Active : icoType6;
            case 'трасса лыжная':
                return active ? icoType7Active : icoType7;
        }
    }

    render() {
        const { data } = this.props;
        const styleMap = { height: window.innerHeight - 180 };
        return (
            <div>
                <div id="yamap" style={styleMap}></div>
            </div>
        );
    }
}

export default YaMap;
import React from 'react';

import icoType1 from '../img/type-1.svg';
import icoType2 from '../img/type-2.svg';
import icoType3 from '../img/type-3.svg';
import icoType4 from '../img/type-4.svg';
import icoType5 from '../img/type-5.svg';
import icoType6 from '../img/type-6.svg';
import icoType7 from '../img/type-7.svg';

const iconType = type => {
    switch(type) {
        case 'горнолыжный склон':
            return icoType1;
        case 'каток с искусственным льдом':
            return icoType2;
        case 'каток с натуральным льдом':
            return icoType3;
        case 'ледовое поле крытое':
            return icoType4;
        case 'площадка для керлинга крытая':
            return icoType5;
        case 'трасса для снегоходов и квадрациклов':
            return icoType6;
        case 'трасса лыжная':
            return icoType7;
    }
}

const isEmptyObject = obj => {
    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            return false;
        }
    }
    return true;
}

const Popup = ({ data, handlePopupToggle = () => {} }) => (
    <div className={ Object.keys(data).length !== 0 ? 'popup open' : 'popup' } >
        <div className="popup_bg" onClick={() => handlePopupToggle(-1)}></div>
        <div className="popup_wrap">
            <div className="popup_head">
                <img src={iconType && iconType(data.zone_type)} className="popup_icon" alt="" />
                <h4 className="popup_type">{data.zone_type}</h4>
                <button className="popup_close" onClick={() => handlePopupToggle(-1)}></button>
            </div>
            <div className="popup_body">
                <h4 className="popup_title">{data.name}</h4>
                <p className="popup_adress">{data.adress}</p>
                <p className="popup_time">{data.time}</p>
                <p className="popup_phone">{data.phone}</p>
                <p className="popup_desc">{data.desc}</p>
            </div>
        </div>
    </div>
);

export default Popup;
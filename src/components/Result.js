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

const Result = ({ data, selectObjectId, handlePopupToggle }) => (
    <li
        className={ selectObjectId === data.id ? "result_item active" : "result_item"}
        onClick={() => handlePopupToggle(data.id)}>
        <h4 className="result_title">{data.name}</h4>
        <p className="result_adress">{data.adress}</p>
        <p className="result_phone">{data.phone}</p>
        <p className="result_time">{data.time}</p>
        <img className="result_icon" src={iconType && iconType(data.zone_type)} alt="" />
        <p className="result_type">{data.zone_type}</p>
    </li>
);

export default Result;
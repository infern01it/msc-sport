import React from 'react';

import Option from './Option';

const Select = ({ settings, value, placeholder, handleSelectOpen = () => {}, handleSelectSearch, handleSelectClick }) => (
    <div className="mws-select">
        <input
            type="text"
            className="mws-input"
            value={settings.select}
            placeholder={placeholder}
            id={value}
            onChange={handleSelectSearch} />
        <button
            type="button"
            onClick={() => handleSelectOpen(value)}
        />
        <ul className={settings.open ? 'mws-select_options open' : 'mws-select_options'}>
            {
                settings.select
                    ?
                settings.displayed.map((el, i) => {
                    return <Option
                        key={i}
                        value={value}
                        handleSelectClick={handleSelectClick}
                    >{el.name}</Option>;
                })
                    :
                settings.data.map((el, i) => {
                    return <Option
                        key={i}
                        value={value}
                        handleSelectClick={handleSelectClick}
                    >{el.name}</Option>;
                })
            }
        </ul>
    </div>
);

export default Select;


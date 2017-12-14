import React from 'react';

import Select from './Select';

const Filter = (
    { 
        district,
        type,
        adress,
        handleSelectOpen,
        handleSelectSearch,
        handleSelectClick,
        handleSelectAdress,
        handleFilterSearch,
        handleFilterReset
    }
) => (
    <section className="filter">
        <div className="container filter_container">
            <div className="row filter_row">
                <div className="col-sm-1">
                    <button
                        type="button"
                        className="mws-reset"
                        onClick={handleFilterReset}
                    >Сбросить</button>
                </div>

                <div className="col-sm-3">
                    <Select 
                        settings={district}
                        value='district'
                        placeholder='Округ или район'
                        handleSelectOpen={handleSelectOpen}
                        handleSelectSearch={handleSelectSearch}
                        handleSelectClick={handleSelectClick} />
                </div>

                <div className="col-sm-3">
                    <Select 
                        settings={type}
                        value='type'
                        placeholder='Категория объекта'
                        handleSelectOpen={handleSelectOpen}
                        handleSelectSearch={handleSelectSearch}
                        handleSelectClick={handleSelectClick} />
                </div>

                <div className="col-sm-3">
                    <input 
                        type='text'
                        placeholder='Указать адрес'
                        className="mws-input"
                        value={ adress === '' ? '' : adress }
                        onChange={handleSelectAdress} />
                </div>

                <div className="col-sm-3">
                    <button
                        type="button"
                        className="mws-search"
                        onClick={handleFilterSearch}
                    >Найти</button>
                </div>
            </div>
        </div>
    </section>
);

export default Filter;
import React from 'react';

import Result from './Result';

const Results = ({ displayedData, resultOpen, selectObjectId, handleResultToggle, handlePopupToggle }) => {
    const resultClass = () => {
        let result = 'result';
        result += displayedData.length !== 0 ? ' search' : '';
        result += resultOpen ? ' open' : '';
        return result;
    }
    return (
        <section className={ resultClass() } >
            <ul className="result_list">
                {
                    displayedData.map((el, i) => 
                        <Result 
                            key={i}
                            data={el}
                            selectObjectId={selectObjectId}
                            handlePopupToggle={handlePopupToggle} />
                    )
                }
            </ul>
            <button className="result_close" onClick={handleResultToggle} ></button>
        </section>
    );
}

export default Results;
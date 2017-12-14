import React from 'react';

const InfoBlock = ({ infoBlockOpen, handleInfoBlockToggle = () => {} }) => (
    <div className={ infoBlockOpen ? "info-block open" : "info-block" }>
        <p><strong>Ошибка:</strong> по заданным критериям ничего не найдено</p>
        <button className="info-block_close" onClick={() => handleInfoBlockToggle('close')}>закрыть</button>
    </div>
);

export default InfoBlock;

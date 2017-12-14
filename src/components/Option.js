import React from 'react';

const Select = ({ children, value, handleSelectClick = () => {} }) => (
    <li>
        <button onClick={() => handleSelectClick(value, children)}>{children}</button>
    </li>
);

export default Select;
import React from 'react';

import Logo from '../img/logo.svg'

const Header = () => (
    <header className="header">
        <div className="container header_container">
            <h1>Спортивная карта Москвы</h1>
            <img src={Logo} alt="" />
        </div>
    </header>
);

export default Header;
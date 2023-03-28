import React from 'react';
import Picture from 'widgets/Picture';
import Logo from 'assets/images/logo.jpg';

import './Header.css';

function Header(props){
    return(
        <header className='display_flex header_container' {...props}>
            <Picture src={Logo} className="logo" alt="logo" />
            <h3>Unsplash App</h3>
        </header>
    )
}

export default Header;
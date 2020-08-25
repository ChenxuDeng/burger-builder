import React from 'react';
import logo from '../../../assets/images/burger-logo.png'
import classes from './logo.module.css'

function Logo(props) {
    return (
        <div>
            <img src={logo} alt="logo" className={classes.logo}/>
        </div>
    );
}

export default Logo;
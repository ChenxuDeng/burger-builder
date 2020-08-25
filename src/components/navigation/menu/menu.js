import React from 'react';
import classes from './menu.module.css'
import Logo from "../logo/logo";
import Items from "../items/items";

function Menu(props) {
    let toggle=[classes.menu, classes.close];
    if(props.show){
        toggle=[classes.menu, classes.open]
    }
    return (
        <div className={toggle.join(' ')}>
            <Logo/>
            <Items/>
        </div>
    );
}

export default Menu;
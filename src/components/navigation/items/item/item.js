import React from 'react';
import classes from './item.module.css'
import {NavLink} from "react-router-dom";

function Item(props) {
    return (
        <div>
            <div className={classes.item}>
                <li>
                    <NavLink to={props.link} activeClassName={classes.active} exact>{props.children}</NavLink>
                </li>
            </div>
        </div>

    );
}

export default Item;
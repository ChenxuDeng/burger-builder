import React from 'react';
import Item from "./item/item";
import classes from './items.module.css'

function Items(props) {
    return (
        <div>
            <ul className={classes.items}>
                <Item link={'/'} active>Burger Builder</Item>
                {props.isAuth?<Item link={'/orders'}>Orders</Item>:null}
                {props.isAuth?<Item link={'/logout'}>Logout</Item>:<Item link={'/auth'}>Auth</Item>}

            </ul>
        </div>
    );
}

export default Items;
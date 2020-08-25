import React from 'react';
import classes from './button.module.css'

function Button(props) {
    return (
        <button className={[classes.Button,classes[props.class]].join(' ')} onClick={props.click} disabled={props.formIsValid}>
            {props.children}
        </button>
    );
}

export default Button;
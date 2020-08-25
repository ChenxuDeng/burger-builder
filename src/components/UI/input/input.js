import React from 'react';
import classes from './input.module.css'

function Input(props) {
    let inputElement=null;
    let style=[];
    if(props.invalid && props.touched){
        style.push(classes.invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement= <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                className={style.join(' ')}
            />;
            break;
        case ('textarea'):
            inputElement= <textarea
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                className={style.join(' ')}
            />;
            break;
        case ('select'):
            inputElement= <select style={{width:'30.5%'}} onChange={props.changed}>
                {props.elementConfig.option.map((option)=>{
                    return <option value={option.value} key={option.value}>
                        {option.displayValue}
                    </option>
                })}
            </select>;
        break;
        default:
            inputElement= <input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
            />;
    }
    return (
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );
}

export default Input;
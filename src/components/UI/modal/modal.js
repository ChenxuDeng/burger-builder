import React from 'react';
import classes from './modal.module.css'
import Backdrop from "../backdrop/backdrop";

function Modal(props) {
    let toggle=[classes.modal,classes.close];
    if (props.show){
        toggle=[classes.modal,classes.open]
    }
    return (
        <div>
            <Backdrop show={props.show} close={props.close}/>
            <div className={toggle.join(' ')}>
                {props.children}
            </div>
        </div>

    );
}

export default Modal;
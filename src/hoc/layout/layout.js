import classes from './layout.module.css'
import Toolbar from "../../components/navigation/toolbar/toolbar";
import React, {Component,useState} from 'react';
import {connect} from 'react-redux'


function Layout(props) {
    const [show,setShow]=useState(false);
    const closeHandler=()=>{
        setShow(false)
    };
    const openHandler=()=>{
        setShow(!show)
    };
    return (
        <div>
            <div><Toolbar show={show} close={closeHandler} open={openHandler} isAuth={props.isAuth}/></div>
            <main className={classes.content}>
                {props.children}
            </main>
        </div>
    );
}

const mapStateToProps=(state)=>{
    return{
        isAuth:state.auth.token !=null
    }
};

export default connect(mapStateToProps)(Layout);




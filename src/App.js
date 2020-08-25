import React, {Component,useEffect} from 'react';
import Layout from './hoc/layout/layout'
import Burgerbuilder from '../src/containers/burgerbuilder/burgerbuilder'
import Checkout from "./containers/checkout/checkout";
import {Route,Switch} from 'react-router-dom'
import Orders from "./containers/order/orders";
import Auth from "./containers/auth/auth";
import Logout from "./containers/auth/logout/logout";
import {connect} from 'react-redux';
import * as actions from './store/action/index'

function App(props) {
    useEffect(()=>{
        props.autoLogin()
    },[]);
    return (
        <div>
            <Layout>
                <Switch>
                    <Route path={'/checkout'} component={Checkout}/>
                    <Route path={'/orders'} component={Orders}/>
                    <Route path={'/auth'} component={Auth}/>
                    <Route path={'/logout'} component={Logout}/>
                    <Route path={'/'} component={Burgerbuilder}/>
                </Switch>
            </Layout>
        </div>
    );
}

const mapDispatchToProps=(dispatch)=>{
    return{
        autoLogin:()=>{dispatch(actions.checkAuthState())}
    }
};

export default connect(null,mapDispatchToProps)(App);




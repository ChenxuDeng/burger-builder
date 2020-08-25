import React, {Component} from 'react';
import Checkoutsummary from "../../components/order/checkoutsummary/checkoutsummary";
import {Route,Redirect} from 'react-router-dom'
import Contactdata from "./contactdata/contactdata";
import {connect} from 'react-redux'

class Checkout extends Component {
    checkoutContinueHandler=()=>{
        this.props.history.replace('/checkout/contact-data')
    };
    checkoutCancelHandler=()=>{
        this.props.history.goBack()
    };
    render() {
        let summary = <Redirect to="/" />;
        if(this.props.ing){
            const purchaseRedirect=this.props.purchase?<Redirect to='/'/>:null;
            summary=<div>
                {purchaseRedirect}
                <Checkoutsummary
                    ingredients={this.props.ing}
                    continue={this.checkoutContinueHandler}
                    cancel={this.checkoutCancelHandler}
                />
                <Route path={this.props.match.path+'/contact-data'} component={Contactdata}/>
            </div>
        }
        return summary
    }
}
const mapStateToProps=(state)=>{
    return{
        ing:state.burgerbuilder.ingredients,
        purchase:state.order.purchase
    }
};

export default connect(mapStateToProps)(Checkout);
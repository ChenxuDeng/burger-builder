import React, {Component} from 'react';
import Order from "../../components/order/order";
import axios from 'axios'
import Loader from "../../components/UI/loader/loader";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/action/index'
import {connect} from 'react-redux'

class Orders extends Component {
    componentDidMount() {
        this.props.fetchOrder(this.props.token,this.props.userId)
    }
    render() {
        let orderList=<div>
            {this.props.order.map((order)=>{
                return <Order key={order.id} ingredients={order.ingredients} price={order.price}/>
            })}
        </div>;
        if(this.props.loading){
            orderList=<Loader/>
        }
        return (
            <div>
                {orderList}
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        order:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        fetchOrder:(token,userId)=>dispatch(actions.fetchOrder(token,userId))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,axios));
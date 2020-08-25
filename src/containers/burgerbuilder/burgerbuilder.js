import React, {Component} from 'react';
import Burger from "../../components/burger/burger";
import Buildcontrols from "../../components/burger/buildcontrols/buildcontrols";
import Modal from "../../components/UI/modal/modal";
import Ordersummary from "../../components/burger/orderSummary/ordersummary";
import axios from 'axios'
import Loader from "../../components/UI/loader/loader";
import WithErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import {connect} from 'react-redux'
import * as burgerbuilderaction from "../../store/action/index";

class Burgerbuilder extends Component {
    state={
        purchase:false,
        show:false,
        loading:false,
    };
    componentDidMount() {
        this.props.getIngredients()
    }
    updatePurchase=(ingredients)=>{
        const sum=Object.keys(ingredients).map((igKey)=>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum+el
        },0);
        return sum>0

    };
    closeModal=()=>{
        this.setState({
            show: false
        })
    };
    
    openModal=()=>{
        if(this.props.isAuth){
            this.setState({
                show:true
            })
        }else {
            this.props.setRedirectPath('/checkout');
            this.props.history.push('/auth')
        }
    };
    continueHandler=()=>{
        alert('You continued!')
    };
    postHandler=()=>{
        this.props.purchaseInit();
        this.props.history.push('/checkout')
    };
    render() {
        const disableInfo={...this.props.ing};
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=this.props.error?<p>Cannot load ingredients</p>:<Loader/>;
        if(this.props.ing){
            burger=<div>
                <Burger
                    ingredients={this.props.ing}
                />
                <Buildcontrols
                    add={this.props.addHandler}
                    remove={this.props.removeHandler}
                    disabled={disableInfo}
                    totalPrice={this.props.price}
                    purchase={this.updatePurchase(this.props.ing)}
                    open={this.openModal}
                    isAuth={this.props.isAuth}
                />
            </div>;
            orderSummary=<Ordersummary
                ingredients={this.props.ing}
                price={this.props.price}
                close={this.closeModal}
                continue={this.continueHandler}
                post={this.postHandler}
            />;
        }
        if(this.state.loading){
            orderSummary=<Loader/>
        }
        return (
            <div>
                <Modal show={this.state.show} close={this.closeModal}>
                    {orderSummary}
                </Modal>
                {burger}
            </div>

        );
    }
}
const mapStateToProps=(state)=>{
    return{
        ing:state.burgerbuilder.ingredients,
        price:state.burgerbuilder.totalPrice,
        error:state.burgerbuilder.error,
        isAuth:state.auth.token!=null
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        addHandler:(ingName)=>{
            return dispatch(burgerbuilderaction.addHanler(ingName))
        },
        removeHandler:(ingName)=>{
            return dispatch(burgerbuilderaction.removeHanler(ingName))
        },
        getIngredients:()=>{
            return dispatch(burgerbuilderaction.getIngredients())
        },
        purchaseInit:()=>{
            return dispatch(burgerbuilderaction.purchaseInit())
        },
        setRedirectPath:(path)=>{dispatch(burgerbuilderaction.authRedirectPath(path))}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Burgerbuilder,axios));

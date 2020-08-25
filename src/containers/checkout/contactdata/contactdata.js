import React, {Component} from 'react';
import Button from "../../../components/UI/button/button";
import classes from './contactdata.module.css'
import axios from "axios";
import WithErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import Loader from "../../../components/UI/loader/loader";
import {withRouter} from 'react-router-dom'
import Input from "../../../components/UI/input/input";
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'

class Contactdata extends Component {
    state={
        orderForm:{
            name:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            street:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Street'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            zipCode:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                isValid:false,
                touched:false
            },
            country:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true
                },
                isValid:false,
                touched:false
            },
            deliveryMethod:{
                elementType: 'select',
                elementConfig:{
                    option:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'fastest',
                validation:{},
                isValid:true
            }
        },
        loading:false,
        formIsValid:false
    };
    postOrderHandler=(event)=>{
        event.preventDefault();
        const formdata={};
        for(let key in this.state.orderForm){
            formdata[key]=this.state.orderForm[key].value
        }
        let order={
            ingredients: this.props.ing,
            price: this.props.price,
            orderData:formdata,
            userId:this.props.userId
        };
        this.props.purchaseburger(order,this.props.token)
    };
    validityHandler=(value,rules)=>{
        let isValid=true;
        if(rules.required){
            isValid=value.trim() !== '' && isValid
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid
        }
        if(rules.maxLength){
            isValid=value.length<=rules.maxLength && isValid
        }
        return isValid;

    };
    inputChangeHandler=(event,targetIdentifier)=>{
        const updatedOrderForm={...this.state.orderForm};
        const updatedOrderElement={...this.state.orderForm[targetIdentifier]};
        updatedOrderElement.value= event.target.value;
        updatedOrderElement.isValid=this.validityHandler(updatedOrderElement.value,updatedOrderElement.validation);
        updatedOrderElement.touched=true;
        updatedOrderForm[targetIdentifier]=updatedOrderElement;
        let formIsValid=true;
        for(let identifier in updatedOrderForm){
            formIsValid=updatedOrderForm[identifier].isValid && formIsValid
        }
        console.log(updatedOrderElement);
        this.setState({
            orderForm:updatedOrderForm,
            formIsValid:formIsValid
        })
    };
    render() {
        const formElementsArray=[];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form=<form action="" className={classes.border}>
            <h4>Enter your contact data</h4>
            {formElementsArray.map((formElement)=>{
                return <Input
                            key={formElement.id}
                            elementConfig={formElement.config.elementConfig}
                            elementType={formElement.config.elementType}
                            value={formElement.config.value}
                            changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                            invalid={!formElement.config.isValid}
                            touched={formElement.config.touched}
                />
            })}
            <Button class={'continue'} click={this.postOrderHandler} formIsValid={!this.state.formIsValid}>Order</Button>
        </form>;
        if(this.props.loading){
            form=<Loader/>
        }
        return (
            <div>
                {form}
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        ing:state.burgerbuilder.ingredients,
        price:state.burgerbuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
};
const mapDispatchToProps=(dispatch)=>{
    return{
        purchaseburger: (orderData,token)=>{
            dispatch(actions.purchaseBurger(orderData,token))
        }
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(WithErrorHandler(Contactdata,axios)));
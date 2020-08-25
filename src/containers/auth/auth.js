import React, {Component} from 'react';
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import classes from './auth.module.css'
import {connect} from 'react-redux'
import * as actions from '../../store/action/index'
import Loader from "../../components/UI/loader/loader";
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state={
        controls:{
            email:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder:'Your Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail:true
                },
                isValid:false,
                touched:false
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:6
                },
                isValid:false,
                touched:false
            },
        },
        isSignUp:true
    };
    componentDidMount() {
        if(!this.props.building && this.props.authRedirectPath!=='/'){
            this.props.setRedirectPath()
        }
    }

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
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;

    };
    inputHandler=(event,controlsName)=>{
        const updatedControls={
            ...this.state.controls,
            [controlsName]:{
                ...this.state.controls[controlsName],
                value:event.target.value,
                isValid:this.validityHandler(event.target.value,this.state.controls[controlsName].validation),
                touched:true
            }
        };
        this.setState({
            controls:updatedControls
        })
    };
    submitHandler=(event)=>{
        event.preventDefault();
        this.props.auth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    };
    switchAuthHandler=()=>{
        this.setState((prevState)=>{
            return{
                isSignUp:!prevState.isSignUp
            }
        })
    };
    render() {
        const formElementArray=[];
        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form=formElementArray.map((formElement)=>{
            return <div>
                    <Input
                        key={formElement.id}
                        elementConfig={formElement.config.elementConfig}
                        elementType={formElement.config.elementType}
                        value={formElement.config.value}
                        changed={(event)=>this.inputHandler(event,formElement.id)}
                        invalid={!formElement.config.isValid}
                        touched={formElement.config.touched}
                    />
                </div>
        });
        if(this.props.loading){
            form=<Loader/>
        }
        let errorMassage=null;
        if(this.props.error){
            errorMassage=<p>{this.props.error.message}</p>
        }
        let redirect=null;
        if(this.props.isAuth){
            redirect=<Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.border}>
                {redirect}
                {errorMassage}
                <form action="" className={classes.form} onSubmit={this.submitHandler}>
                    {form}
                    <Button class={'continue'}>Submit</Button>
                </form>
                <Button class={'cancel'} click={this.switchAuthHandler}>SWITCH TO {this.state.isSignUp?'Sign in':'Sign up'}</Button>
            </div>
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token!=null,
        building:state.burgerbuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
};

const mapDispatchToProps=(dispatch)=>{
    return{
        auth:(email,password,isSignUp)=>{dispatch(actions.auth(email,password,isSignUp))},
        setRedirectPath:()=>{dispatch(actions.authRedirectPath('/'))}
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
import React, {Component} from 'react';
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    componentDidMount() {
        this.props.logout()
    }
    render() {
        return (
            <div>
                <Redirect to={'/'}/>
            </div>
        );
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        logout:()=>{dispatch(actions.logout())}
    }
};

export default connect(null,mapDispatchToProps)(Logout);
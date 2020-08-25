import React,{Component} from 'react';
import Modal from "../../components/UI/modal/modal";

function WithErrorHandler(WrappedComponent,axios) {
    return class extends Component{
        state={
          error:null
        };
        componentWillMount() {
            this.resInterceptors=axios.interceptors.response.use(res=>res,error =>{
                this.setState({
                    error:error
                })
            });
            this.reqInterceptors=axios.interceptors.request.use((req)=>{
                this.setState({
                    error:null
                });
                return req
            })
        }
        componentWillUnmount() {
            axios.interceptors.response.eject(this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors)
        }

        closeHandler=()=>{
            this.setState({
                error:null
            })
        };
        render() {
            return (
                <div>
                    <Modal show={this.state.error} close={this.closeHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </div>
            );
        }
    }

}

export default WithErrorHandler;
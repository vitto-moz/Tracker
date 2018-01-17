import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from "./loginStyles"
import {Image} from "react-native"
// import {login} from '../../actions/userActions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            loading: false,
            rememberMe: false,
            showError : null

        }

    }
    componentWillMount(){
        if(localStorage.getItem('token')){
            this.props.history.push(`/devices`);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    login(e){
        e.preventDefault();
        this.props.dispatch(login({user : this.state.userName, password: this.state.password}))

    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.user.user){
            if(this.state.rememberMe){
                localStorage.setItem('token', nextProps.user.ssid);
            }
            this.props.history.push(`/devices`);
        }
        if(nextProps.user.error){
            this.setState({
                showError : nextProps.user.error
            });
            this.timeout = setTimeout(()=> {
                    this.setState({
                        showError:null
                    })
                }, 3000)

        }
    }

    render() {
        return (
            <View style={styles.loginWrap}>
                <View style={styles.loginFormWrap}>
                    <Image source={{ uri: '../../images/minifinder-tracktor-logo-login.png'}}/>
                    {/*<form onSubmit={(e)=>this.login(e)}>*/}
                        {/*<label htmlFor="userName" className="login-form-label">*/}
                            <View style={styles.loginBg}>
                                <Image source={{ uri: '../../images/user.svg'}} />
                            </View>
                            <TextInput
                              value={this.state.topicText}
                              onChangeText={(e) => this.handleInputChange(e)}
                              onSubmitEditing={this.onSubmitTopicText}
                              style={styles.loginFormInput}
                              autoFocus={true}
                              ref='topicTextInput'
                            />
                        {/*</label>*/}
                        {/*<label htmlFor="password" className="login-form-label">*/}
                            {/*<div className='login_bg'>*/}
                                {/*<img src={require('../../images/password.svg')} alt=""/>*/}
                            {/*</div>*/}
                            {/*<input type="password"*/}
                                   {/*name="password"*/}
                                   {/*className="login-form-input"*/}
                                   {/*value={this.state.password}*/}
                                   {/*onChange={(e) => this.handleInputChange(e)}/>*/}
                        {/*</label>*/}

                        {/*<button type="submit" className="login-submit-button text-sd">{this.props.user.loading?'Loading' : 'Login'}</button>*/}
                        {/*{this.state.showError?<p>{this.state.showError}</p>:null}*/}
                        {/*<div className='login-form-checkbox'>*/}
                            {/*<input type="checkbox" id="rememberMe" name="rememberMe" checked={this.state.rememberMe}*/}
                                   {/*onChange={(e) => this.handleInputChange(e)}/>*/}
                            {/*<label htmlFor="rememberMe">*/}

                            {/*</label>*/}
                            {/*<p>Remember me</p>*/}
                        {/*</div>*/}

                    {/*</form>*/}
                </View>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const {user} = state;
    return { user}
}

export default connect(mapStateToProps)(Login);

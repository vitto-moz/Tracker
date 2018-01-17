import React, {Component} from 'react';
import {connect} from "react-redux";
import styles from "./loginStyles"
import {Button, CheckBox, Image, Text, TextInput, View} from "react-native"
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
    // componentWillMount(){
    //     if(localStorage.getItem('token')){
    //         this.props.history.push(`/devices`);
    //     }
    // }

    handleInputChange(text) {
        this.setState({userName: text});
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
                              value={this.state.userName}
                              onChangeText={text => this.handleInputChange(text)}
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

                        <Button style={styles.loginSubmitButton}
                                onPress={onCreateTopicPress}
                                title={this.props.user.loading ? 'Loading' : 'Login'}/>
                        {/*{this.state.showError?<p>{this.state.showError}</p>:null}*/}
                        {/*<div className='login-form-checkbox'>*/}
                        <View style={styles.loginFormCheckbox}></View>
                        <View>
                            <CheckBox
                              center
                              title='rememberMe'
                              checkedIcon='dot-circle-o'
                              uncheckedIcon='circle-o'
                              checked={this.state.rememberMe}
                              onPress={(e) => this.setState((prevState, props) => ({rememberMe: !prevState.rememberMe}))}
                            />
                        </View>
                            <Text>Remember me</Text>
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

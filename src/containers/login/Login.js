import React, { Component } from 'react';
import { connect } from "react-redux";
import styles from "./loginStyles"
import { Image, Text, TextInput, View } from "react-native"
import { CheckBox, Button } from 'react-native-elements'
import { login } from '../../actions/userActions';
import { Actions } from "react-native-router-flux";
import { AsyncStorage } from "react-native"

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
        if(AsyncStorage.getItem('token')){
            Actions.devices()
        }
    }

    handleInputChange(value, inputName) {
        this.setState({[inputName]: value});
    }

    tryLogin = () => {
        this.props.dispatch(login({user : this.state.userName, password: this.state.password}))
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user.user){
            if(this.state.rememberMe){
                AsyncStorage.setItem('token', nextProps.user.ssid);
            }
            Actions.devices()
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
                <Image style={styles.backgroundImage}
                    source={require('../../images/bg_home.png')}/>
                <View style={styles.loginFormWrap}>
                    <Image style={styles.logoImage}
                           source={require('../../images/minifinder-tracktor-logo-login.png')}/>
                    <View style={styles.loginFormInputWrap}>
                        <Image style={styles.inputIcon}
                               source={require('../../images/user.png')} />
                        <TextInput
                          value={this.state.userName}
                          onChangeText={text => this.handleInputChange(text, 'userName')}
                          style={styles.loginFormInput}
                          ref='topicTextInput'
                        />
                    </View>
                    <View style={styles.loginFormInputWrap}>
                        <Image  style={styles.inputIcon}
                                source={require('../../images/password.png')} />
                        <TextInput
                          value={this.state.password}
                          onChangeText={text => this.handleInputChange(text, 'password')}
                          style={styles.loginFormInput}
                          ref='topicTextInput'
                        />
                    </View>
                    <View style={styles.loginFormActionsWrap}>

                            <CheckBox
                              center
                              title='Remember me'
                              checkedIcon='dot-circle-o'
                              uncheckedIcon='circle-o'
                              onPress={() => this.handleInputChange(!this.state.rememberMe, 'rememberMe')}
                              checked={this.state.rememberMe}
                              containerStyle={styles.checkboxContainerStyle}
                              textStyle={styles.checkboxTextStyle}
                            />

                            <Button containerViewStyle={styles.loginSubmitButton}
                                    backgroundColor='#00aeef'
                                    onPress={this.tryLogin}
                                    title={this.props.user.loading ? 'Loading' : 'Login'}/>

                          {this.state.showError ? <Text>{this.state.showError}</Text> : null}
                    </View>
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

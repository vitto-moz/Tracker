import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  loginFormWrap: {
    // maxWidth: '500px',
    // margin: '0% auto',
    // padding: '15% 0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
  },
  logoImage: {
    resizeMode: 'contain',
    flex: 1,
    width: 300,
    paddingTop: 30,
    position: 'relative',
    marginTop: 20,
    marginBottom: 10,

    // textAlign: 'center'
  },
  loginFormCheckbox: {
    // backgroundСolor: '#282c31',
    // height: '45px',
    // width: '45px',
    // position: 'absolute',
    // left:0,
    // top:0,
  },
  loginFormInputWrap: {
    height: 45,
    maxWidth: 300,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  inputIcon: {
    // backgroundСolor: '#282c31',
    height: 45,
    width: 45,
    marginRight: 10,
    // position: 'absolute',
    // left:0,
    // top:0,
  },
  loginFormInput: {
    backgroundColor: '#99d5eb33',
    opacity: 0.9,
    flex: 1,
    marginRight: 10
  },
  loginSubmitButton: {
    backgroundColor: '#00aeef',
    height: 45,
    width: 300,
    marginTop: 10,
  },
})

export default styles

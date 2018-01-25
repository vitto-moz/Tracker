import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  loginWrap: {
    flex: 1,
    // remove width and height to override fixed static size
    width: null,
    height: null,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backgroundImage: {
    flex: 1,
    // resizeMode: 'cover',
    position: 'absolute',
    justifyContent: 'center',
  },
  loginFormWrap: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    paddingLeft: 20,
  },
  logoImage: {
    resizeMode: 'contain',
    width: 300,
    paddingTop: 30,
    position: 'relative',
    marginTop: 20,
    marginBottom: 10,
  },
  loginFormInputWrap: {
    height: 45,
    maxWidth: 300,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row'
  },
  inputIcon: {
    height: 45,
    width: 45,
    backgroundColor: '#282c31'
  },
  loginFormInput: {
    backgroundColor: '#99d5eb33',
    color: 'white',
    opacity: 0.9,
    flex: 1,
  },
  loginFormActionsWrap: {
    display: 'flex',
    alignItems: 'flex-end',
    height: 45,
    marginTop: 10,
    flexDirection: 'column',
    position: 'relative',
    width: '100%'
  },
  loginSubmitButton: {
    backgroundColor: '#00aeef',
    height: 45,
    marginTop: 10,
    width: 292,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 4
  },
  checkboxContainerStyle: {
    backgroundColor: 'transparent',
    height: 45,
    marginTop: 10,
    marginRight: 0,
    width: 292,
    borderRadius: 4
  },
  checkboxTextStyle: {
    color: 'white'
  },
})

export default styles

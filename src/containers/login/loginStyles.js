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
    alignItems: 'center'
  },
  logoImage: {
    resizeMode: 'contain',
    flex: 1,
    width: 300,
    paddingTop: 30,
    position: 'relative',
    marginTop: 20,

    // textAlign: 'center'
  },
  loginBg: {
    // backgroundСolor: '#282c31',
    // height: '45px',
    // width: '45px',
    // position: 'absolute',
    // left:0,
    // top:0,
  },
  loginFormCheckbox: {
    // backgroundСolor: '#282c31',
    // height: '45px',
    // width: '45px',
    // position: 'absolute',
    // left:0,
    // top:0,
  },
  loginFormLabel: {
    // backgroundСolor: '#282c31',
    // height: '45px',
    // width: '45px',
    // position: 'absolute',
    // left:0,
    // top:0,
  },
})

export default styles

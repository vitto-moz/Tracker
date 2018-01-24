import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  deviceListWrap: {
    width: '80%',
    height: '100%',
    backgroundColor: '#121211cc',
    flex: 1,
    position: 'absolute',
    zIndex: 3,
    left: -500,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 100
  },
  deviceListWrapActive: {
    left: 0
  },
  deviceListTitle: {
    flex: 1,
    color: 'black'
  }
})

export default styles


import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  deviceListWrap: {
    width: '100%',
    height: '100%',
    backgroundColor: '#121211cc',
    flex: 1,
    position: 'absolute',
    zIndex: 3,
    left: -500,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 70
  },
  deviceListWrapActive: {
    left: 0
  },
  deviceListTitle: {
    color: '#a5a5a5',
    fontSize: 13,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#50585b'
  }
})

export default styles


import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  deviceListWrap: {
    position: 'absolute',
    width: 200,
    height: 500,
    backgroundColor: 'grey',
    flex: 1,
    display: 'flex',
    left: -500
  },
  deviceListWrapActive: {
    left: 0
  },
})

export default styles


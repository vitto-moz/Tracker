import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mapWrap: {
    position: 'relative',
    width: '100%',
    flex: 1,
    display: 'flex'
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

export default styles


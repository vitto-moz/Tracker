import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  mapWrap: {
    position: 'relative',
    width: '100%',
    flex: 1,
    display: 'flex',
    zIndex: 1
  },
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  pin: {
    width: 30,
    height: 45
  },
  googleMapsInfoBox: {
    minWidth: 300,
    backgroundColor: '#343838',
    opacity: 0.75,
    position: 'relative',
    padding: 25,
    width: 330,
    marginBottom: 5
  },
  calloutInfo: {
    color: '#ffffff'
  },
  calloutAddress: {
    color: '#ffffff',
    marginBottom: 5,
  }
})

export default styles


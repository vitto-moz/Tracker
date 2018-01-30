import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  devicePageWrapper: {
    position: 'relative',
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  loaderWrap: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: 15,
    top: '45%',
  },
  loadingText: {
    fontSize: 25
  }
})

export default styles

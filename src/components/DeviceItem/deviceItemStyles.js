import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  deviceMainInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  batterycon: {
    width: 50,
    height: 50,
    resizeMode: 'contain'
  },
  batteryIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5
  },
  deviceItem: {
    padding: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  deviceNamepassive: {
    color: '#d2ac14',
  },
  deviceNameoffline: {
    color: 'white'
  },
  deviceNameactive: {
    color: '#90be4d',
  },
  timeAgo: {
    color: '#a5a5a5',
  },
  batteryLevel: {
    color: '#a5a5a5',
  },
  batteryLevelWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  deviceStatusWrap: {
    display: 'flex',
    flexDirection: 'row',
  }
})

export default styles


import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  deviceMainInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  batteryIcon: {
    width: 30,
    height: 20,
    resizeMode: 'contain',
    marginRight: 5
  },
  activenessIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 5
  },
  deviceItem: {
    padding: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#50585b'
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
  timeAgoWrap: {
    color: '#a5a5a5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  triggerMore: {
    position: 'absolute',
    padding: 5,
    right: 0,
    top: 10,
  }
})

export default styles


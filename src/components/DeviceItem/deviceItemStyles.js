import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  deviceMainInfo: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10
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
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#50585b',
    position: 'relative',
    width: '100%',
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
  },
  historyTrigger: {
    borderTopWidth: 1,
    borderColor: '#50585b',
    // width: '100%',
    position: 'relative',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  triggerText: {
    fontSize: 15,
    color: 'white'
  },
  triggerImage: {
    marginRight: 10,
  }
})

export default styles


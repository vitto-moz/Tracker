import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  modalContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1,
    alignSelf: 'center',
    padding: '10%'
  },
  createButton: {
    backgroundColor: '#00aeef',
    height: 45,
    width: 100,
    marginRight: 0,
    marginLeft: 0,
    borderRadius: 4
  },
  modalTextWrap: {
    backgroundColor: '#d1d2d3',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalOptionsWrap: {
    backgroundColor: '#181f24',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText : {
    fontSize: 20,
    color: '#4C5264',
    textAlign: 'center'
  },
  mapTypesWrap : {
    margin: 20,
  },
  mapTypeText : {
    color: 'white',
    padding: 10,
    textAlign: 'center'
  },
  mapTypeTextActive : {
    color: 'blue',
    padding: 10,
    textAlign: 'center'
  },
  mapTypeHeaderText : {
    width: '100%',
    color: 'white',
    padding: 12,
    textAlign: 'left'
  }
})

export default styles


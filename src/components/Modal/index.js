import React, {PureComponent} from "react";
import {Modal, Text, TouchableOpacity, View} from "react-native"
import styles from "./modalStyles"
import {Button} from "react-native-elements"

const MAP_TYPE = [
  {type: 'standard',   name: 'Classic'},
  {type: 'satellite',  name: 'Satellite'},
  {type: 'hybrid',     name: 'Hybrid'},
  {type: 'terrain',    name: 'Terrain'},
];

class SettingsModal extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            clicked : this.props.mapType,
            initialType: this.props.mapType
        }
    }
    click(type){
        this.setState({
            clicked : type
        })
    }

    closeModal = () => {
      this.setState({clicked: this.state.initialType})
      this.props.changeMapType(this.state.initialType)
    }

    saveChanges = () => {
      this.setState({initialType: this.state.clicked})
      this.props.changeMapType(this.state.clicked)
    }

    render(){
        let itemList = MAP_TYPE.map((item, index)=>{
            return <TouchableOpacity key={index}
                                     onPress={() => this.click(item.type)}
                  >
                    <Text  style={ item.type === this.state.clicked
                                  ? [styles.mapTypeText, styles.mapTypeTextActive]
                                  : styles.mapTypeText }>
                      {item.name}
                    </Text>
                  </TouchableOpacity>


          });


        return (

          <View style={styles.container}>
            <Modal
              visible={this.props.showModal}
              animationType={'slide'}
              onRequestClose={this.closeModal}
              transparent={true}
            >
              <View style={styles.modalContainer}>
                {/*<View style={styles.modalOverlay}*/}
                      {/*onPress={()=>this.props.closeDrawModal()}/>*/}

                <View style={styles.modalTextWrap}>
                  <Text style={styles.modalText}>Settings</Text>
                </View>

                <View style={styles.modalOptionsWrap}>
                  <View style={styles.mapTypesWrap}>
                    <Text style={styles.mapTypeHeaderText}>Choose Map Type:</Text>
                    {itemList}
                  </View>
                  <Button containerViewStyle={styles.createButton}
                          color={'black'}
                          backgroundColor='#00aeef'
                          onPress={this.saveChanges}
                          title={'Save'}/>
                </View>


              </View>

            </Modal>
          </View>
        );
    }
}


export default SettingsModal;
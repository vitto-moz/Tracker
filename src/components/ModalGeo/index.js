import React, {PureComponent} from "react";
import {Button} from "react-native-elements"
import {Modal, Text, TouchableWithoutFeedback, View} from "react-native"
import styles from "./modalGeoStyles"

export default class ModalGeo extends PureComponent{
    constructor(props){
        super(props);
        this.state = {
            clicked : this.props.mapType
        }
    }
    click(type){
        this.setState({
            clicked : type
        })
    }

    render(){
        return (
          <View style={styles.container}>
              <Modal
                visible={this.props.showModal}
                animationType={'slide'}
                onRequestClose={this.props.closeDrawModal}
                transparent={true}
              >
                <TouchableWithoutFeedback onPress={this.props.closeDrawModal}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalOverlay}
                        onPress={() => this.props.closeDrawModal()}/>

                  <View style={styles.modalTextWrap}>
                    <Text style={styles.modalText}>
                      {this.props.activeItemId
                        ? 'Edit / Create a Geo Fence zone'
                        : 'Select device, please'}
                    </Text>
                  </View>

                  <View style={styles.modalOptionsWrap}>

                    {this.props.isPolygonPresent
                      ? null
                      : <Button containerViewStyle={styles.createButton}
                                color={'black'}
                                backgroundColor='#00aeef'
                                onPress={() => {
                                  this.props.activeItemId
                                    ? this.props.createPolygon()
                                    : this.props.closeDrawModal()
                                }}
                                title={this.props.activeItemId ? 'Create' : 'Ok'}/>
                    }

                    {this.props.isPolygonPresent
                      ? <Button containerViewStyle={styles.createButton}
                                  color={'black'}
                                  backgroundColor='#00aeef'
                                  onPress={() => {
                                    this.props.deletePolygon()
                                    this.props.createPolygon()
                                    // this.props.editPolygon(this.state.clicked)
                                  }}
                                  title={'Edit'}/>
                      : null
                    }

                    {this.props.isPolygonPresent
                      ? <View>
                          <Button containerViewStyle={styles.createButton}
                                  color={'black'}
                                  backgroundColor='#00aeef'
                                  onPress={() => this.props.deletePolygon()}
                                  title={'Delete'}/>
                      </View>
                      : null
                    }

                  </View>
                </View>
                </TouchableWithoutFeedback>
              </Modal>
          </View>
        );
    }

}

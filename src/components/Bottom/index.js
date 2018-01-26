import React, {Component} from 'react';
import PropTypes from "prop-types";
import {Image, TouchableOpacity, View} from "react-native"
import styles from "./bottomStyles"

const Bottom =({showModal, showDrawModal})=> {
        return (
            <View style={styles.bottomOptionsWrap}>
                <TouchableOpacity style={styles.mapOptionWrap}>
                  <Image style={styles.optionImage} source={require('../../images/track.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.mapOptionWrap} onPress={showDrawModal}>
                  <Image style={styles.optionImage} source={require('../../images/GeoFence3.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.mapOptionWrap} onPress={showModal}>
                  <Image style={styles.optionImage} source={require('../../images/setting.png')} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.mapOptionWrap}>
                  <Image style={styles.optionImage} source={require('../../images/info.png')} />
                </TouchableOpacity>
            </View>
        );
};

Bottom.propTypes = {
    showModal : PropTypes.func,
    showDrawModal : PropTypes.func,
};
export default Bottom;

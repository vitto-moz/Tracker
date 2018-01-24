import React, {Component} from 'react';
import PropTypes from "prop-types";

const Bottom =({showModal, showDrawModal})=> {
        return (
            <div className="bar-wrapper bottom">
                <div className='map-keys'>
                    <img src={require('../../images/track.svg')} alt=""/>
                </div>

                <div className='map-keys'>
                    <img src={require('../../images/GeoFence3.svg')} alt="" onClick={showDrawModal}/>

                </div>
                <div className='map-keys'>
                    <img src={require('../../images/setting.svg')} alt="" onClick={showModal}/>

                </div>
                <div className='map-keys'>
                    <img src={require('../../images/info.svg')} alt=""/>
                </div>
            </div>
        );
};

Bottom.propTypes = {
    showModal : PropTypes.func,
    showDrawModal : PropTypes.func,
};
export default Bottom;

import React, {Component} from 'react';
import '../../containers/deviceList/DeviceList.css';
import FontAwesome from 'react-fontawesome';

const Header = ({toggleList, logout})=> {


        return (
            <div className="bar-wrapper top">
                <div className='header-left'>
                    <FontAwesome
                    onClick={()=>toggleList()}
                    className='icon-color'
                    name='bars'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
                    />
                </div>
                <p className='header-mid'><img className="header-logo" src={require("../../images/minifinder-tracktor-logo-login.png")}/></p>
                <div className='header-right'>
                    <FontAwesome
                    className='icon-color'
                    name='sign-out'
                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                    onClick={()=>{logout()}}
                    />
                </div>
            </div>
        );
}

export default Header;

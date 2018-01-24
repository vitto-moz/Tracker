import React, {Component} from 'react';
// import '../../containers/deviceList/DeviceList.css';
import { Image } from "react-native"
import { Header } from 'react-native-elements'

const HeaderWrap = ({toggleList, logout})=> {


        return (
          <Header
            outerContainerStyles={{backgroundColor: 'black', zIndex: 5}}
            leftComponent={{ icon: 'menu', color: '#fff', onPress: toggleList }}
            centerComponent={<Image source={require("../../images/minifinder-tracktor-logo-login.png")}
                                    style={{width: 220, height: 30, top: 2, resizeMode: 'contain'}}/>}
            rightComponent={{ icon: 'exit-to-app', color: '#fff', onPress: logout  }}
          />

            // <View className="bar-wrapper top">
            //     <View className='header-left'>
            //         <FontAwesome
            //         onClick={()=>toggleList()}
            //         className='icon-color'
            //         name='bars'
            //         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)'}}
            //         />
            //     </View>
            //     <p className='header-mid'>
            //       <Image style={styles.headerLogo}
            //            src={require("../../images/minifinder-tracktor-logo-login.png")}/>
            //     </p>
            //     <div className='header-right'>
            //         <FontAwesome
            //         className='icon-color'
            //         name='sign-out'
            //         style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
            //         onClick={()=>{logout()}}
            //         />
            //     </div>
            // </View>
        );
}

export default HeaderWrap;

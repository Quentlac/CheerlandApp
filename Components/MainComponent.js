import React from "react";
import {AsyncStorage, StatusBar, View, Image} from "react-native";

import MainStack from "../Navigation/Stack";
import Map from "./Map";
import {testAuth} from "../CheerlandAPI/auth";

import * as Notifications from "expo-notifications";

import {connect} from "react-redux";
import Onboarding from "react-native-onboarding-swiper";

class MainComponent extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            tutorial: false
        }
    }

    render(){
        return (
          <View style={{ flex: 1 }}>
            {!this.state.tutorial ? 
              <MainStack></MainStack> :
              <Onboarding
                onDone={() => {
                    AsyncStorage.setItem("tutorial", "true");
                    this.setState({tutorial: false});
                    
                    }
                }
                onSkip={() => {
                    AsyncStorage.setItem("tutorial", "true");
                    this.setState({tutorial: false});
                       
                } 
                }
                imageContainerStyles={{paddingBottom: 0}}
                titleStyles={{fontSize: 25}}
                pages={[
                    
                    {
                        backgroundColor: '#993366',
                        image: <Image source={require('../assets/icon-app.png')}/>,
                        title: 'Bienvenue !',
                        subtitle: 'Découvres le fonctionnement de Cheerland',
                    },
                    {
                        backgroundColor: '#993366',
                        image: <Image source={require('../assets/Tuto/step1.gif')}/>,
                        title: 'Déplacez vous pour explorer le monde',
                    },

                    {
                        backgroundColor: '#993366',
                        image: <Image source={require('../assets/Tuto/step2.gif')}/>,
                        title: 'Créez des Cheers !',
                    },

                    {
                        backgroundColor: '#993366',
                        image: <Image source={require('../assets/Tuto/step3.gif')}/>,
                        title: 'Répondez aux cheers !',
                    },

                    {
                        backgroundColor: '#993366',
                        image: <Image source={require('../assets/Tuto/step4.gif')}/>,
                        title: 'Naviguez dans la conversation !',
                    },
                ]}
                />
            }
          </View>
        );
    }

    componentDidMount() {
        StatusBar.setBarStyle("light-content");
        StatusBar.setBackgroundColor("rgba(0, 0, 0, 0.5)");

        AsyncStorage.getItem("tutorial").then((value) => {
            if(value === null)
                this.setState({
                    tutorial: true
                });
        }).catch((error) => alert(error));

    }

}

export default connect(state => { return {token: state.token }})(MainComponent);
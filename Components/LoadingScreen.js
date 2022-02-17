import React from "react";

import {View, Image, Animated} from "react-native";
import MainTheme from "../Styles/MainTheme";

class LoadingScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            rotation: new Animated.Value(25),
        }
    }

    render(){
        return(
            <View style={[MainTheme.rootPage, { flex: 1, alignItems: "center", justifyContent: "center"}]}>
                <Animated.Image source={require("../assets/icon-app.png")}
                       style={{
                           width: 200,
                           height: 200,

                           transform: [
                               {
                                    rotate: this.state.rotation.interpolate({inputRange: [0, 360], outputRange: ["0deg", "360deg"]})
                               },
                               {
                                   scale: this.state.rotation.interpolate({inputRange: [20, 360], outputRange: [0.5, 1]})
                               }
                           ]

                       }}
                ></Animated.Image>
            </View>
        )
    }

    componentDidMount() {

        Animated.loop(
            Animated.spring(this.state.rotation, {
                toValue: 360,
                timing: 800,
                tension: 15,
                useNativeDriver: true,
                restSpeedThreshold: 0.5
            }),
            {iterations: 1000}
        ).start();


    }


}

export default LoadingScreen;
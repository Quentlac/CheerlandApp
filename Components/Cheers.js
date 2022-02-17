import React from 'react';
import {View, Text, TouchableOpacity, Animated, Easing, Image} from 'react-native';

import CheerStyles from '../Styles/CheersStyles';
import {AdMobBanner} from "expo-ads-admob";

class Cheers extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
            size: 1//new Animated.Value(0)
        }
    }


    render(){
        return(
            <Animated.View style={{

                position: "absolute",

                top: this.props.posY,
                left: this.props.posX,
                transform: [{scale: this.state.size}]

            }}
                  onTouchStart={(event) => this.props.onTouchStart(event)}
                  onTouchEnd={() => this.props.onTouchEnd()}
                  onTouchMove={(event) => this.props.onTouchMove(event)}
            >

                <View style={CheerStyles.userinfos}>
                    {(this.props.type == "AD") ? <Text style={CheerStyles.ads_label}>Sponsorisé</Text> :
                        <Text style={CheerStyles.username}>@{this.props.user.name}</Text>
                    }
                    {(this.props.user.certif == true) ?
                    <Image style={CheerStyles.certif} source={require("../assets/UI/certif-icon.png")} /> : null}

                </View>

                <TouchableOpacity
                    onLayout={(event) => {
                        this.props.onLayout(this.props.id, event.nativeEvent.layout.width, event.nativeEvent.layout.height);
                        //this.setState({width: event.nativeEvent.layout.width, height: event.nativeEvent.layout.height})
                    }}

                    style={[CheerStyles.root, {
                        backgroundColor: this.props.color + "88",
                        shadowColor:  this.props.color,
                    }]}

                    onPress={(event) => this.props.onPress(this.props.id, this.state)}
                >

                    {(this.props.type == "TEXT") ?
                            <Text style={CheerStyles.text}>{this.props.content}</Text> : null }

                    {(this.props.type == "IMAGE") ?
                        <Image style={CheerStyles.image} source={{uri: "https://cheerland.fr/" + this.props.content}} resizeMode="cover"></Image> : null }

                    {(this.props.type == "AD") ?
                        <AdMobBanner
                            adUnitID="ca-app-pub-3778298952636594/8145235321"
                            bannerSize="mediumRectangle"
                            servePersonalizedAds={true}
                        /> : null }


                </TouchableOpacity>
            </Animated.View>
        );
    }

    componentDidMount() {
        Animated.timing(this.state.size, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
            easing: Easing.elastic(1)
        })//.start();



    }

}

export default Cheers;
import React from "react";

import {View, Text} from "react-native";
import MainTheme from "../Styles/MainTheme";

import {connect} from "react-redux";

class Favorites extends React.Component{


    render(){

        return (
            <View style={MainTheme.rootPage}>
                <Text style={MainTheme.text}>Page de favoris</Text>
            </View>
        )


    }

}

export default connect(state => { return {token: state.token }})(Favorites);
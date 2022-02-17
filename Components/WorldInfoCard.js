import React from "react";
import {View, Text, StyleSheet, Image} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import MainTheme from "../Styles/MainTheme";

class WorldInfoCard extends React.Component {

    render(){
         return(
            <View style={style.root}>
                {this.props.public ?
                    <Ionicons style={{flex: 1}} name={"globe-outline"} size={30} color={"#bbbbbb"}/> :
                    <Ionicons style={{flex: 1}} name={"lock-closed"} size={30} color={"#bbbbbb"}/> }

                <Text style={style.title}>{this.props.title}</Text>
                <View style={style.memberInfo}>
                    <Text style={MainTheme.text}>🟢 {this.props.online} / {this.props.total}</Text>
                </View>
            </View>
         );
    }
}

export default WorldInfoCard;

const style = StyleSheet.create({

    root:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginHorizontal: 10,
        margin: 3,
        padding: 10,
        backgroundColor: "#1f1f1f",
        borderRadius: 10,
    },

    title: {
        flex: 6,
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        margin: 10,
        textAlign: "left"
    },

    memberInfo: {
        backgroundColor: "#111111",
        padding: 5,
        borderRadius: 5,
    }

});
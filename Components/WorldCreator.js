import React from "react";
import {View, Image, TextInput, TouchableOpacity, Text, AsyncStorage, Switch} from "react-native";

import MainTheme from "../Styles/MainTheme";

import WorldCreatorStyle from "../Styles/WorldCreatorStyle";
import LoginStyles from "../Styles/LoginStyles";
import {Ionicons} from "@expo/vector-icons";
import {checkWorldnameAvailable, createWorldRequest} from "../CheerlandAPI/worldManager";

import {connect} from "react-redux";

class WorldCreator extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            worldname: "",
            nameAvailable: true,
            public: false,
            pin: "",
            correct: false,
            error: ""
        }
    }

    _submit() {
        createWorldRequest(this.props.token, this.state.worldname, this.state.public, this.state.pin)
            .then((result) => {
                if(result.data.error == true)
                    alert("Une erreur est survenue !! (" + result.data.msg + ")");
                else{
                    this.props.navigation.goBack();
                }
            })
            .catch((error) => {
                alert("Une erreur est survenue !! (" + error + ")");
            })
    }

    _formIsCorrect(){
        return this.state.worldname != "" && this.state.nameAvailable && (this.state.public || this.state.pin != "");
    }

    render(){
        return (
            <View style={MainTheme.rootPage}>
                <TextInput style={WorldCreatorStyle.input_search} placeholder={"Nom du monde"} autoFocus={true} placeholderTextColor={"gray"}
                           onChangeText={(worldname) => {
                               this.setState({worldname: worldname});
                               checkWorldnameAvailable(worldname).then((result) => {
                                   console.log(result.data);
                                   if(result.data.msg == "AVAILABLE")
                                       this.setState({nameAvailable: true});
                                   else if(result.data.msg == "USED")
                                       this.setState({nameAvailable: false});
                               }).catch((error) => console.log(error))
                           }}
                ></TextInput>

                {(!this.state.nameAvailable) ?
                    <Text style={[LoginStyles.error, {textAlign: "center"}]}>Ce nom est déjà pris :(</Text> : null }

                <View style={WorldCreatorStyle.inline_block}>
                    <Text style={MainTheme.text}>Monde publique</Text>
                    <Switch

                        trackColor={{false: "#767577", true: "#5d5d5d"}}
                        thumbColor={this.state.public ? "#993366" : "#a1a1a1"}
                        value={this.state.public}
                        onValueChange={() => this.setState({public: !this.state.public})}

                    ></Switch>
                </View>

                {(! this.state.public) ?
                <View style={[WorldCreatorStyle.inline_block, { justifyContent: "space-around" }]}>
                    <Ionicons name={"lock-closed"} size={30} color={"white"}/>

                    <TextInput
                        onChangeText={(text) => this.setState({pin: text})}
                        style={[WorldCreatorStyle.input_search, {width: "50%"}]} placeholder={"Code PIN"} placeholderTextColor={"gray"} keyboardType={"numeric"}></TextInput>

                </View> : null }


                <TouchableOpacity
                    disabled={!this._formIsCorrect()}
                    onPress={() => this._submit()}
                    style={[MainTheme.action_button, LoginStyles.submit_button, {flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: (!this._formIsCorrect()) ? "gray" : "#993366"}]}><Text style={MainTheme.action_button_text}>Créer le nouveau monde</Text><Ionicons name={"chevron-forward-outline"} size={30} color={"white"}/></TouchableOpacity>
                </View>
        );
    }


}

export default connect(state => {return {token: state.token}})(WorldCreator);
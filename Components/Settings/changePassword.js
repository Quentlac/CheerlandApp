import React from "react";

import {View, Text, TextInput, TouchableOpacity} from "react-native";
import MainTheme from "../../Styles/MainTheme";
import AccountManagerStyle from "../../Styles/AccountManagerStyle";
import LoginStyles from "../../Styles/LoginStyles";
import {connect} from "react-redux";
import {changePasswordRequest} from "../../CheerlandAPI/auth";

class changePassword extends React.Component {


    _submit(){
        if(this.state.new != this.state.confirm)
            alert("Les mots de passes ne correspondent pas !");

        else{
            changePasswordRequest(this.props.token, this.state.current, this.state.new).then((result) => {
                if(result.data.error == true){
                    alert("Une erreur est survenue ! (" + result.data.code + ")");
                }
                else{
                    this.props.navigation.goBack();
                }
            }).catch((error) => alert("Une erreur est survenue ! (" + error + ")"))
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            current: "",
            new: "",
            confirm: ""
        }
    }

    render(){
        return(
            <View style={MainTheme.rootPage}>
                <TextInput onChangeText={(text) => this.setState({current: text})} style={AccountManagerStyle.input} placeholder={"Mot de passe actuel"} placeholderTextColor={"gray"} secureTextEntry={true}/>
                <TextInput onChangeText={(text) => this.setState({new: text})} style={AccountManagerStyle.input} placeholder={"Nouveau mot de passe"} placeholderTextColor={"gray"} secureTextEntry={true}/>
                <TextInput onChangeText={(text) => this.setState({confirm: text})} style={AccountManagerStyle.input} placeholder={"Confirmer le mot de passe"} placeholderTextColor={"gray"} secureTextEntry={true}/>

                <TouchableOpacity
                    onPress={() => this._submit()}
                    style={[MainTheme.action_button, LoginStyles.submit_button]}><Text style={MainTheme.action_button_text}>Modifier le mot de passe</Text></TouchableOpacity>
            </View>
        );
    }

}

export default connect(state => { return {token: state.token}})(changePassword);
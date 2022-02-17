import React from "react";

import {View, Text, TextInput, TouchableOpacity} from "react-native";
import MainTheme from "../../Styles/MainTheme";
import AccountManagerStyle from "../../Styles/AccountManagerStyle";
import LoginStyles from "../../Styles/LoginStyles";
import {connect} from "react-redux";
import {changeEmailRequest, getUserInfo} from "../../CheerlandAPI/auth";

class changeEmail extends React.Component {


    _submit(){
        if(this.state.new != this.state.confirm)
            alert("Les mots de passes ne correspondent pas !");

        else{
            changeEmailRequest(this.props.token, this.state.mail).then((result) => {
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
            mail: ""
        }
    }

    render(){
        return(
            <View style={MainTheme.rootPage}>
                <TextInput onChangeText={(text) => this.setState({mail: text})} style={AccountManagerStyle.input} placeholder={"Adresse email"} placeholderTextColor={"gray"} value={this.state.mail}/>

                <TouchableOpacity
                    onPress={() => this._submit()}
                    style={[MainTheme.action_button, LoginStyles.submit_button]}><Text style={MainTheme.action_button_text}>Modifier l'adresse email</Text></TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        getUserInfo(this.props.token).then((result) => {
            this.setState({mail: result.data.mail});
        });
    }

}

export default connect(state => { return {token: state.token}})(changeEmail);
import React from "react";
import {View, Image, TextInput, TouchableOpacity, Text, AsyncStorage} from "react-native";
import LoginStyles from "../Styles/LoginStyles";

import MainTheme from "../Styles/MainTheme";
import {login} from "../CheerlandAPI/auth";

import * as Notifications from "expo-notifications";
import {connect} from "react-redux";


class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            push_token: ""
        }
    }

    _submit() {
        login(this.state.username, this.state.password, this.state.push_token)
            .then((result) => {
                if(result.data.msg == "ACCESS_DENIED"){
                    alert("Identifiant et/ou mot de passe incorrects !") ;
                }
                else {
                    AsyncStorage.setItem("token", result.data.token);
                    this.props.dispatch({type: "LOGIN", value: result.data.token});
                    this.props.navigation.popToTop();
                }

            })
            .catch((error) => alert("Une erreur est survenue, veuillez réessayer ultérieurement" + error));

    }

    render(){
        return (
            <View style={LoginStyles.root}>
                <Image source={require("../assets/UI/login.png")} style={LoginStyles.icon}></Image>
                <Text style={LoginStyles.title}>Connexion</Text>

                <Text style={LoginStyles.desc}>Connectez vous à votre compte Cheerland grâce à vos identifiants.</Text>
                <TextInput
                    style={LoginStyles.input}
                    placeholder={"Nom d'utilisateur"}
                    placeholderTextColor={"#444"}
                    onChangeText={(text) => this.setState({username: text})}
                />

                <TextInput
                    style={LoginStyles.input}
                    placeholder={"Mot de passe"}
                    placeholderTextColor={"#444"}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                />

                <TouchableOpacity
                    onPress={() => this._submit()}
                    style={[MainTheme.action_button, LoginStyles.submit_button]}><Text style={MainTheme.action_button_text}>Connexion</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Register")}
                ><Text style={LoginStyles.link}>Pas encore inscris ?</Text></TouchableOpacity>
            </View>
        );
    }

    componentDidMount() {
        Notifications.getExpoPushTokenAsync().then((token) => this.setState({push_token: token.data}));
    }


}

export default connect()(Login);
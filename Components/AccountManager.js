import React from "react";

import {View, Text, TouchableOpacity, Image} from "react-native";
import MainTheme from "../Styles/MainTheme";

import AccountManagerStyle from "../Styles/AccountManagerStyle";
import {connect} from "react-redux";
import {deconnectRequest, getUserInfo} from "../CheerlandAPI/auth";

class AccountManager extends React.Component{


    constructor(props) {
        super(props);

        this.state = {
            username: "",
            name: "",
            firstname: "",
            nbCheers: 0,
            certif: false
        }
    }

    _updateUserInfos(){
        getUserInfo(this.props.token).then((result) => {
            this.setState({
                username: result.data.username,
                name: result.data.name,
                firstname: result.data.firstname,
                nbCheers: result.data.nbCheers,
                certif: result.data.certif,
                special_badge: result.data.special_badge
            });
        });
    }

    _deconnect(){
        deconnectRequest(this.props.token).then((result) => {
            console.log(result.data);
            if(!result.data.error){
                this.props.navigation.navigate("MapView");
            }
        })

    }

    render(){
        return (
            <View style={MainTheme.rootPage}>
                <View style={AccountManagerStyle.user_info_box}>
                    <Text style={AccountManagerStyle.username}>@{this.state.username}&nbsp; 
                    {(this.state.certif == true) ?  <Image style={{ width: 23, height: 23, resizeMode: "contain"}} source={require("../assets/UI/certif-icon.png")} /> : null }
                    {(this.state.special_badge == true) ?  <Image style={{ width: 23, height: 23, resizeMode: "contain"}} source={require("../assets/UI/special-badge.png")} /> : null }
                    </Text>

                    <Text style={AccountManagerStyle.irl_name}>{this.state.firstname + " " + this.state.name}</Text>
                    <Text style={AccountManagerStyle.cheers_number}>{this.state.nbCheers}</Text>
                </View>


                <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangePassword")}><Text style={AccountManagerStyle.settings_button}>Modifier mon mot de passe</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("ChangeEmail")}><Text style={AccountManagerStyle.settings_button}>Modifier mon adresse email</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this._deconnect()}><Text style={AccountManagerStyle.settings_button}>Me déconnecter de l'application</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => alert("Cheerland a été créé par Quentin LACOMBE ! © 2022")}><Text style={AccountManagerStyle.settings_button}>À propos de Cheerland</Text></TouchableOpacity>

            </View>
        )
    }

    componentDidMount() {
        this._updateUserInfos();
    }

}

export default connect(state => { return {token: state.token}})(AccountManager);
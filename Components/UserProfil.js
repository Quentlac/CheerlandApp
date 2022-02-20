import React from "react";
import {View, Text, Image} from "react-native";

import MainTheme from "../Styles/MainTheme";
import AccountManagerStyle from "../Styles/AccountManagerStyle";


class UserProfil extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "Devistorm",
            name: "Quentin",
            firstname: "LACOMBE",
            nbCheers: 150,
            certif: true
        }
    }


    render() {
        return(
            <View style={MainTheme.rootPage}>
                <View style={AccountManagerStyle.user_info_box}>
                    <Text style={AccountManagerStyle.username}>@{this.state.username}&nbsp; 
                    {(this.state.certif == true) ?  <Image style={{ width: 23, height: 23, resizeMode: "contain"}} source={require("../assets/UI/certif-icon.png")} /> : null }
                    {(this.state.special_badge == true) ?  <Image style={{ width: 23, height: 23, resizeMode: "contain"}} source={require("../assets/UI/special-badge.png")} /> : null }
                    </Text>

                    <View style={AccountManagerStyle.subInfos}>
                        <View style={AccountManagerStyle.subscribers}>
                            <Text style={AccountManagerStyle.subText}>125</Text>
                            <Text style={AccountManagerStyle.subText}>Abonnés</Text>
                        </View>
                        <View style={AccountManagerStyle.subscribers}>
                            <Text style={AccountManagerStyle.subText}>350</Text>
                            <Text style={AccountManagerStyle.subText}>Abonnements</Text>
                        </View>
                    </View>
                </View>


            
            </View>
        );
    }


}

export default UserProfil;
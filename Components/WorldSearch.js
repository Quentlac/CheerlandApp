import React from "react";
import {View, Text, TextInput, TouchableOpacity, FlatList} from "react-native";
import MainTheme from "../Styles/MainTheme";
import LoginStyles from "../Styles/LoginStyles";
import WorldListStyles from "../Styles/WorldListTheme";
import WorldInfoCard from "./WorldInfoCard";
import {joinWorldRequest, searchWorlds} from "../CheerlandAPI/worldManager";
import DialogInput from "react-native-dialog-input";
import {connect} from "react-redux";

class WorldSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search_result: [],
            worldname: "",
            pinError: false,
            pinPopUpVisible: false,
        }
    }

    _search(words){
        searchWorlds(words).then((result) => {
            this.setState({search_result: result.data});
        }).catch((error) => alert(error));
    }

    _joinWorld(worldname){
        let index = this.state.search_result.findIndex((item) => item.title === worldname);

        this.setState({worldname: worldname});

        if(this.state.search_result[index].public == 0){
            this.setState({pinPopUpVisible: true});
        }
        else{
            this._joinWorldRequest(worldname, "");
        }

    }

    _joinWorldRequest(worldname, pin){
        joinWorldRequest(this.props.token, worldname, pin)
            .then((result) => {
                if(result.data.error == false){
                    this.props.navigation.goBack();
                }
                else if(result.data.error == true && result.data.code == "BAD_PIN"){
                    this.setState({pinError: true});
                }
                else{
                    alert("Une erreur est survenue (" + result.data.code + ")");
                }
            }).catch((error) => alert("Une erreur est survenue (" + error + ")"));
    }

    render(){
        return(
            <View style={[MainTheme.rootPage, { alignItems: "center", flex: 1 }]}>
                <TextInput onChangeText={(text) => this._search(text)} style={[LoginStyles.input]} placeholder={"Nom du monde"} autoFocus={true} placeholderTextColor={"gray"}></TextInput>

                <FlatList style={{ width: '100%' }} data={this.state.search_result} keyExtractor={(item) => item.title} renderItem={
                    ({item}) => <TouchableOpacity onPress={() => this._joinWorld(item.title)}><WorldInfoCard title={item.title} online={0} total={item.total_user} public={item.public == 1} /></TouchableOpacity>
                }/>

                <DialogInput
                    isDialogVisible={this.state.pinPopUpVisible}
                    title={"Monde privé"}
                    message={this.state.pinError ? "Mauvais code PIN !!!" : "Veuillez saisir le code pin"}
                    hintInput={"CODE PIN"}
                    submitInput={(pin) => this._joinWorldRequest(this.state.worldname, pin)}
                    closeDialog={() => this.setState({pinPopUpVisible: false})}
                    textInputProps={{keyboardType: "numeric"}}
                >

                </DialogInput>

            </View>
        );
    }


}

export default connect(state => {return {token: state.token}})(WorldSearch);
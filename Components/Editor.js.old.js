import React from "react";
import {
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    View,
    Text,
    KeyboardAvoidingView,
    Image,
    Button,
    AsyncStorage,
    ActivityIndicator
} from "react-native";
import EditorStyle from "../Styles/EditorStyle";
import MainTheme from "../Styles/MainTheme";

import {SvgUri} from "react-native-svg";

import * as ImagePicker from "expo-image-picker";

import {submitNewCheer, uploadMedia} from "../CheerlandAPI/setter";

class Editor extends React.Component {


    _submit(){
        this.setState({loading: true});
        if(this.state.editorMode == 1)
            this._submitText();

        else
            this._submitImage();

    }

    _submitText(){
        if(this.state.text == ""){
            alert("Le message ne peut pas être vide !");
        }

        else {
            submitNewCheer(this.token, this.props.posX, this.props.posY, this.props.path, this.state.text, "#993366")
                .then((reponse) => this.props.cancel(reponse.data.id))
                .catch((error) => alert("Une erreur est survenue, veuillez réessayer !" + error));

        }
    }

    _submitImage(){
        uploadMedia(this.state.imageUri)
            .then((result) => {
                let json_result = JSON.parse(result.body);
                if(json_result.error == false)
                    submitNewCheer(this.token, this.props.posX, this.props.posY, this.props.path, json_result.url, "#993366", "IMAGE").then((response) => this.props.cancel(response.data.id)).catch((e) => alert("Une erreur est survenue, veuillez réessayer !" + e));
                else alert("Une erreur est survenue, veuillez réessayer !");

            }).catch((error) => alert("Une erreur est survenue, veuillez réessayer !" + error));

    }

    constructor(props) {
        super(props);

        this.token = "";

        this.state = {
            text: "",
            editorMode: 1, // 1 = Text ; 2 = Image
            imageUri: "",
            loading: false
        };
    }

    _loadImage(data){
        console.log(data);
    }

    _pickMedia(){
        ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,

        }).then((result) => {
            console.log(result);
            if(result.cancelled == false)
                this.setState({editorMode: 2, imageUri: result.uri});
        });
    }

    _pickCamera(){
        ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        }).then((result) => {
            console.log(result);
            if(result.cancelled == false)
                this.setState({editorMode: 2, imageUri: result.uri});
        });
    }

    _displayLoading() {
        return (<View style={EditorStyle.loading}>
            <ActivityIndicator size="large" color="#993366"></ActivityIndicator>
        </View>);

    }

    render(){
        let test = "";
        return (
            <KeyboardAvoidingView style={EditorStyle.root}>
                <View style={{ flex: 1, flexDirection: "row", maxHeight: 80}}>
                    <View style={EditorStyle.header}>
                        <TouchableOpacity style={{flex: 1}} onPress={() => this.props.cancel(-1)}><Image style={EditorStyle.back_button} source={require("../assets/UI/back-button.png")}></Image></TouchableOpacity>
                        {this.state.loading ?
                            this._displayLoading()
                            :
                            <TouchableOpacity style={{flex: 1}} onPress={() => this._submit()}
                                              style={[MainTheme.action_button, EditorStyle.submit]}><Text
                                style={MainTheme.action_button_text}>ENVOYER</Text></TouchableOpacity>
                        }
                    </View>
                </View>


                {(this.state.editorMode == 1) ?
                    <TextInput onChangeText={(text) => this.setState({text: text})} style={EditorStyle.input}
                               keyboardAppearance="dark" autoFocus={true} placeholder="Que voulez vous partager ?"
                               multiline={true}></TextInput>
                    : null }

                {(this.state.editorMode == 2) ?
                    <Image style={EditorStyle.image_preview} source={{ uri: this.state.imageUri}}></Image>
                    : null }

                <View style={EditorStyle.bottom_action_bar}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={() => this._pickMedia()}>
                        <Image style={EditorStyle.action_icons} source={require("../assets/UI/media-selector.png")}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, alignItems: "center"}} onPress={() => this._pickCamera()}>
                        <Image style={EditorStyle.action_icons} source={require("../assets/UI/camera.png")}></Image>
                    </TouchableOpacity>
                    <View style={{flex: 1}}></View>
                </View>

            </KeyboardAvoidingView>
        );
    }

    componentDidMount() {
        AsyncStorage.getItem("token").then((result) => {
            this.token = result
        });

    }

}

export default Editor;
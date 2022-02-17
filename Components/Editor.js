import React from "react";
import {View, TextInput, TouchableOpacity, ActivityIndicator, Image, ImageBackground, BackHandler} from "react-native";
import CheersStyles from "../Styles/CheersStyles";

import {Ionicons} from "@expo/vector-icons";
import EditorStyle from "../Styles/EditorStyle";
import {submitNewCheer, uploadMedia} from "../CheerlandAPI/setter";
import * as ImagePicker from "expo-image-picker";

import {connect} from "react-redux";

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
            this.setState({loading: false});
        }

        else {
            submitNewCheer(this.props.token, this.props.posX, this.props.posY, this.props.path, this.props.worldname, this.state.text, "#993366")
                .then((reponse) => {
                    this._reset();
                    this.props.cancel(reponse.data.id);
                })
                .catch((error) => alert("Une erreur est survenue, veuillez réessayer !" + error));

        }
    }

    _submitImage(){
        uploadMedia(this.state.imageUri)
            .then((result) => {
                let json_result = JSON.parse(result.body);
                if(json_result.error == false) {
                    submitNewCheer(this.props.token, this.props.posX, this.props.posY, this.props.path, this.props.worldname, json_result.url, "#993366", "IMAGE").then((response) => {
                        this._reset();
                        this.props.cancel(response.data.id)
                    }).catch((e) => alert("Une erreur est survenue, veuillez réessayer !" + e));
                }
                else alert("Une erreur est survenue, veuillez réessayer !");

            }).catch((error) => alert("Une erreur est survenue, veuillez réessayer !" + error));

    }

    _reset(){
        this.setState({text: "", editorMode: 1, imageUri: "", loading: false});
        this.props.dispatch({type: "DISABLE_EDITOR"});
    }

    constructor(props) {
        super(props);

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




    render() {
        return(
            <View style={{
                flex: 1,
                marginTop: 80,
                backgroundColor: "rgba(0,0,0,0.7)",
            }}>

                    {(this.state.editorMode == 1) ?
                    <TextInput multiline={true}
                               value={this.state.text}
                               style={[CheersStyles.root, EditorStyle.input]}
                               placeholder={"Qu'avez vous à raconter ?"}
                               maxLength={250}
                               onSubmitEditing={() => this._submit()}
                               returnKeyType={"send"}
                               onChangeText={(text) => this.setState({text: text})}
                    /> : null }

                    {(this.state.editorMode == 2) ?
                        <View style={[CheersStyles.root, EditorStyle.image_preview]}>
                            <Image style={{width: 250, height: 250}} source={{ uri: this.state.imageUri}}></Image>
                        </View>
                        : null }

                <Ionicons onPress={() => {
                    this._reset();
                    this.props.cancel(-1);
                }} style={EditorStyle.close_button} name={"close"} color={"rgba(255,255,255,0.81)"} size={50}></Ionicons>

                <Ionicons onPress={() => this._pickMedia()} style={EditorStyle.media_button} name={"images"} color={"rgba(255,255,255,0.81)"} size={40}></Ionicons>

                    {this.state.loading ? <ActivityIndicator style={EditorStyle.send_button} size="large" color="#993366"></ActivityIndicator> :
                        <Ionicons style={EditorStyle.send_button} name={"send"} color={"rgba(255,255,255,0.81)"} size={40}
                                  onPress={() => this._submit()}
                        ></Ionicons>
                    }
            </View>
        );

    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", () => {

            this._reset();

        });
    }

}

export default connect(state => { return {token: state.token, worldname: state.worldname }})(Editor);
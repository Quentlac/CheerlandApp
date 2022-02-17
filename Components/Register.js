import React from "react";
import {View, Image, TextInput, TouchableOpacity, Text} from "react-native";
import LoginStyles from "../Styles/LoginStyles";

import MainTheme from "../Styles/MainTheme";
import {checkUsernameAvailable, checkMailAvailable, registerRequest} from "../CheerlandAPI/register";

class Register extends React.Component {

    constructor(props) {
        super(props);

        this.nameStep = [
            "Comment doit-on t'appeler sur Cheerland ?",
            "On a besoin de ton email pour sécuriser ton compte",
            "Choisis un mot de passe qui te permettras d'accéder à ton compte",
            "Comment t'appelles tu dans la vraie vie ?"
        ];

        this.state = {
            step: 1,

            mail: "",
            username: "",
            name: "",
            firstname: "",

            password: "",
            confirm_password: "",

            correct: false,
            error: ""
        }
    }

    _nextStep(){
        if(this.state.step == 1){
            if(this.state.username === ""){
                this.setState({correct: false, error: "Tu n'as rien écris..."});
            }
            else checkUsernameAvailable(this.state.username).then((result) => {
                if(result.data.msg == "AVAILABLE")
                    this.setState({correct: true, step: this.state.step + 1});
                else if(result.data.msg == "USED")
                    this.setState({correct: false, error: "Ce nom est déjà pris :("});
            });
        }
        else if(this.state.step == 2){
            if(this.state.mail === ""){
                this.setState({correct: false, error: "Tu dois saisir une adresse email !"});
            }
            else if(!this._emailIsValid(this.state.mail)){
                this.setState({correct: false, error: "Format de l'adresse mail invalide !"});
            }
            else checkMailAvailable(this.state.mail).then((result) => {
                if(result.data.msg == "AVAILABLE")
                    this.setState({correct: true, step: this.state.step + 1});
                else if(result.data.msg == "USED")
                    this.setState({correct: false, error: "Un compte existe déjà avec cette adresse email !"});
            });
        }

        else if(this.state.step == 3){
            if(this.state.password === ""){
                this.setState({correct: false, error: "Tu dois entrer un mot de passe !"});
            }
            else{
                if(this.state.password != this.state.confirm_password){
                    this.setState({correct: false, error: "Les mots de passes sont différents !"});
                }
                else{
                    this.setState({correct: true, step: this.state.step + 1});
                }
            }
        }

        else if(this.state.step == 4){
            if(this.state.name === "" || this.state.firstname === ""){
                this.setState({correct: false, error: "Tu dois entrer ton nom ET ton prénom !"});
            }
            else{
                this._submit();
            }
        }

    }

    _emailIsValid(email){
        const mail_regex = new RegExp("^([a-z0-9]|\\.)+@[a-z0-9]+\\.[a-z]+$", 'i');
        return mail_regex.test(email);
    }

    _submit(){
        registerRequest(this.state.username, this.state.mail, this.state.password, this.state.name, this.state.firstname)
            .then((result) => {
                if(result.data.error){
                    alert("Une erreur est survenue, veuillez réessayer ultérieurement !");
                }
                else{
                    //Compte créé avec succès !
                    alert("Compte créé avec succès !");
                    this.props.navigation.navigate("Login");
                }
            })
            .catch((error) => {
                alert("Une erreur est survenue, veuillez réessayer ultérieurement !");
            })
    }


    _displayStep(){
        if(this.state.step == 1){
            return (
                <TextInput
                    style={LoginStyles.input}
                    placeholder={"Nom d'utilisateur"}
                    placeholderTextColor={"#444"}
                    maxLength={20}
                    onChangeText={(username) => {
                        this.setState({username: username});
                        checkUsernameAvailable(username).then((result) => {
                            if(result.data.msg == "AVAILABLE")
                                this.setState({correct: true});
                            else if(result.data.msg == "USED")
                                this.setState({correct: false, error: "Ce nom est déjà pris :("});
                        })
                    }}
                />
            );
        }
        else if(this.state.step == 2){
            return (
                <TextInput
                    style={LoginStyles.input}
                    placeholder={"Adresse email"}
                    placeholderTextColor={"#444"}
                    autoComplete={"mail"}
                    keyboardType={"email-address"}

                    onChangeText={(mail) => {
                        this.setState({mail: mail})
                    }}
                />
            );
        }

        else if(this.state.step == 3){
            return (
                <View style={{ width: "100%", alignItems: "center" }}>
                    <TextInput
                        style={LoginStyles.input}
                        placeholder={"Mot de passe"}
                        placeholderTextColor={"#444"}
                        secureTextEntry={true}

                        onChangeText={(password) => {
                            this.setState({password: password});
                        }}
                    />
                    <TextInput
                        style={LoginStyles.input}
                        placeholder={"Confirmation du mot de passe"}
                        placeholderTextColor={"#444"}
                        secureTextEntry={true}

                        onChangeText={(password) => this.setState({confirm_password: password})}
                    />
                </View>
            );
        }

        else if(this.state.step == 4){
            return (
                <View style={{ width: "100%", alignItems: "center" }}>
                    <TextInput
                        style={LoginStyles.input}
                        placeholder={"Nom"}
                        placeholderTextColor={"#444"}
                        maxLength={30}

                        onChangeText={(name) => this.setState({name: name})}
                    />
                    <TextInput
                        style={LoginStyles.input}
                        placeholder={"Prénom"}
                        placeholderTextColor={"#444"}
                        maxLength={30}

                        onChangeText={(firstname) => this.setState({firstname: firstname})}
                    />
                </View>
            );
        }


    }

    render(){
        return (
            <View style={LoginStyles.root}>
                <Image source={require("../assets/UI/registration.png")} style={LoginStyles.icon}></Image>

                <Text style={LoginStyles.desc}>{this.nameStep[this.state.step - 1]}</Text>

                {this._displayStep()}
                <Text style={LoginStyles.error}>{(this.state.correct) ? null : this.state.error}</Text>

                <TouchableOpacity onPress={() => this._nextStep()} style={[MainTheme.action_button, LoginStyles.submit_button]}><Text style={MainTheme.action_button_text}>Suivant</Text></TouchableOpacity>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate("Login")}
                ><Text style={LoginStyles.link}>Déjà inscris ?</Text></TouchableOpacity>
            </View>
        );
    }


}

export default Register;
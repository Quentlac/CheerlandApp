import React from 'react'
import Cheers from "./Cheers";
import Editor from "./Editor";
import {
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    Vibration,
    Platform,
    AsyncStorage, FlatList, BackHandler
} from "react-native";

import {getCheersInArea, getMyWorlds, getNextGoodCheer} from "../CheerlandAPI/getter";
import { NavigationContext } from '@react-navigation/native';

import LoadingScreen from "./LoadingScreen";


import MapStyles from "../Styles/MapStyles";
import {testAuth} from "../CheerlandAPI/auth";

import {connect} from "react-redux";
import {Touchable} from "react-native-web";
import {Ionicons} from "@expo/vector-icons";

import * as Notifications from "expo-notifications";

class Map extends React.Component{

    _displayCheer(id, posX, posY, content, user, color, type, time){


        return (<Cheers
                    key={id}
                    id={id}
                    posX={posX - this.state.position[0]}
                    posY={posY - this.state.position[1]}
                    type={type}
                    content={content}
                    user={user}
                    color={color}
                    time={time}
                    onPress={(e) => {
                        if(!this.cheer_move)
                            this._cheerClickHandler(e);
                    }}

                    //Les 3 props suivantes permettent de récupérer les events sur le cheers (lorsque l'utilisateur déplace la map)
                    onTouchStart={(e) => {
                        this._moveMapStart(e);
                        //this.cheer_move = false;
                    }}
                    onTouchEnd={this._refreshAllCheers}
                    onTouchMove={(e) => {
                        this._moveMap(e);
                        //this.cheer_move = true;
                    }}

                    onLayout={this._getCheerSize}
                 />
        );
    }

    //Cette fonction est appelé à chaque rendu de cheer afin de récupérer sa taille (utile pour centrer)
    _getCheerSize = (id, width, height) => {
        //On vérifie si on connait déjà la taille du cheer en question. Si c'est pas le cas on l'ajoute
        if(this.cheerSize.findIndex((item) => item.id == id) == -1)
            this.cheerSize.push({id: id, width: width, height: height});
    }

    _refreshAllCheers = () => {
        return new Promise((resolve, reject) => {
            let cheers = [];

            let xStart = this.state.position[0];
            let yStart = this.state.position[1];

            //On ajoute une pub
            /*cheers.push({
                id: 0,
                posX: Math.round(this.state.position[0] / 3000) * 3000 + 1000,
                posY: Math.round(this.state.position[1] / 3000) * 3000 + 1000,
                content: null,
                user: {name: "Sponso", certif: true},
                type: "AD",
                color: "#ff0000",
                path: this.state.path,
                animated: false
            });*/

            //On va demander au serveur les cheers à afficher
            getCheersInArea(this.props.token, xStart - this.width, yStart - this.height, this.width * 3, this.height * 3, this.state.path, this.props.worldname)
                .then((response) => {

                    response.data.forEach((cheer) => {
                        let anim = this.state.cheers_list.findIndex((item) => item.id == cheer.id) == -1;
                        cheers.push({
                            id: cheer.id,
                            posX: cheer.position[0],
                            posY: cheer.position[1],
                            content: cheer.content,
                            type: cheer.type,
                            user: {name: cheer.username, certif: cheer.certif, special_badge: cheer.special_badge},
                            color: cheer.color,
                            time: cheer.time,
                            path: cheer.path,
                            animated: anim
                        });
                    });

                    this.setState({cheers_list: cheers}, () => resolve());

                })
                .catch((error) => reject());
        });
    }

    _displayAllCheers(){
        let cheers_view = [];

        this.state.cheers_list.forEach((cheer) => {
            if(cheer.path == this.state.path || cheer.id == this.state.path)
                cheers_view.push(this._displayCheer(cheer.id, cheer.posX, cheer.posY, cheer.content, cheer.user, cheer.color, cheer.type, cheer.time));

        });

        return cheers_view;
    }

    //Fonction permettant de revenir au "path précédent"
    _backPath(){
        (Platform.OS == "android") ? Vibration.vibrate(70):null;

        let prev_path = this.state.path_historic.shift();

        this._teleportToCheer(Number.parseInt(this.state.path));

        this.setState({path: prev_path}, () => {this._refreshAllCheers(); console.log(this.state.path);});

    }

    _backToCheer(id){

        this.setState({loading: true});
        let index = this.state.path_historic.findIndex((item) => item.path == id);

        let newHist = this.state.path_historic.slice(index);


        this.setState({path: id, path_historic: newHist, position: [this.state.path_historic[index].posX, this.state.path_historic[index].posY]}, () => this._refreshAllCheers().then(() => {
            this._teleportToCheer(id);
            this.setState({loading: false});
        }));
    }


    _teleportToCheer = (id) => {

        let index = this.state.cheers_list.findIndex((item) => item.id == id);
        let indexSize = this.cheerSize.findIndex((item) => item.id == id);

        console.log(this.cheerSize);
        console.log("###############################")

        let posX = this.state.cheers_list[index].posX - this.width / 2 + this.cheerSize[indexSize].width / 2;
        let posY = this.state.cheers_list[index].posY - this.height / 2 + this.cheerSize[indexSize].height / 2;

        this.state.position = [posX, posY];
        //this.cheerSize = [];
    }

    _backToHome(x = 0, y = 0){
        console.log("RootPosition: " + this.rootPosition);
        this.setState({loading: true, path: 'R', position: [x, y], path_historic: []}, () => {
            this._refreshAllCheers().then(() => this.setState({loading: false}));
        });

    }

    _infinityDiscover = (nav) => {
        if(nav && !this.state.loading){
            if(this.state.path == 'R'){
                getNextGoodCheer(this.props.worldname).then((result) => {
                    this.setState({loading: true, path: 'R', path_historic: []}, () =>
                    {
                        this.state.position =  [Math.round(result.data.posX), Math.round(result.data.posY)];
                        this._refreshAllCheers().then(() => {
                            //alert(this.state.cheers_list.findIndex((item) => item.id == result.data.ID));
                            setTimeout(() => {
                                this._teleportToCheer(result.data.ID);
                                this.setState({loading: false});
                            }, 200);
                        }).catch((error) => alert(error + result.data.ID));
                    });
                }).catch((error) => alert(error));
            }
            else this._backToHome(this.rootPosition[0], this.rootPosition[1]);
        }
    }


    _moveMap = (event) => {

        let dX = this.state.oldPosition[0] - event.nativeEvent.pageX;
        let dY = this.state.oldPosition[1] - event.nativeEvent.pageY;

        this.setState({
            position: [this.state.position[0] + dX, this.state.position[1] + dY],
            oldPosition: [event.nativeEvent.pageX, event.nativeEvent.pageY]
        });

        if(dX > 5 || dY > 5) {
            this.cheer_move = true;
        }

        if(this.state.path === 'R') {
           this.rootPosition = [this.state.position[0], this.state.position[1]];
        }
    }

    _moveMapStart = (event) => {

        this.cheer_move = false;

        this.setState({
            moveStart: [event.nativeEvent.pageX, event.nativeEvent.pageY],
            oldPosition: [event.nativeEvent.pageX, event.nativeEvent.pageY]
        });
    }

    _cheerClickHandler = (id, cheer_state) => {

        (Platform.OS == "android") ? Vibration.vibrate(70) : null;

        this._teleportToCheer(id);

        let newHist = this.state.path_historic.slice();

        let titleIndex = this.state.cheers_list.findIndex(item => item.id == id);

        newHist.unshift({
            path: id,
            posX: this.state.cheers_list[titleIndex].posX,
            posY: this.state.cheers_list[titleIndex].posY,
            title: this.state.cheers_list[titleIndex].content.substring(0, 10) + ((this.state.cheers_list[titleIndex].content.length > 10) ? "..." : "")
        });

        this.setState({path_historic: newHist, path: id}, () => this._refreshAllCheers());


    }

    constructor(props) {
        super(props);

        this.width = Dimensions.get('window').width;
        this.height = Dimensions.get('window').height;

        this.longPressTimeout = null;
        this.webClick = false; // Si la souris est pressé (web uniquement)

        this.cheerSize = []; // Tableau contenant la taille de chaque cheers (pour le centrage)
        this.cheerAnim = []; // Tableau avec les cheers à animé (ceux qui viennent d'apparaître)

        this.token = null; // Token d'accès
        this.cheer_move = false;

        this.rootPosition = [0, 0]; // Position sur le path R pour éviter de tout le temps retourner au centre


        this.state = {
            moveStart: [0, 0],
            position: [Dimensions.get('window').width / 2, Dimensions.get('window').height / 2],
            oldPosition: [0, 0],
            path: 'R', // Path actuel
            path_historic: [], // Historique des paths (pour remonter dans l'arborescence)
            cheers_list: [],
            displayEditor: false,
            loading: true,
            notifications: false,
            notifs_data: null,
            zoom: 1
        }
    }

    render(){

        return (
            <View style={{ flex: 1 }}>

                <View>
                <Image
                    source={require("../assets/UI/dark-grid-background.jpg")}
                    style={[MapStyles.background, {
                        top: -this.state.position[1] % Dimensions.get('window').height - Dimensions.get('window').height,
                        left: -this.state.position[0] % Dimensions.get('window').width - Dimensions.get('window').width
                    }]}
                    resizeMode='repeat'
                />
                </View>

                <View
                    style={{
                        position: "absolute",
                        width: '100%',
                        height: '100%',
                        backgroundColor: "rgba(255,0,0,0)",

                    }}
                    onTouchStart={(event) => {
                        this._moveMapStart(event);
                    }}

                    onTouchEnd={(event) => {
                        this._refreshAllCheers();

                        AsyncStorage.setItem("posX", this.state.position[0].toString());
                        AsyncStorage.setItem("posY", this.state.position[1].toString());
                        AsyncStorage.setItem("path", this.state.path);
                    }}

                    onTouchMove={(event) => {
                        this._moveMap(event);

                    }}

                    onMouseDown={(event) => {
                        this._moveMapStart(event);
                        this.webClick = true;

                    }}

                    onMouseMove={(event) => {
                        if(this.webClick)
                            this._moveMap(event);

                    }}

                    onMouseUp={(event) => {
                        this._refreshAllCheers();
                        clearTimeout(this.longPressTimeout);
                        this.webClick = false;

                        AsyncStorage.setItem("posX", this.state.position[0]);
                        AsyncStorage.setItem("posY", this.state.position[1]);
                        AsyncStorage.setItem("path", this.state.path);
                    }}

                />


                <View>
                    {this._displayAllCheers()}
                </View>
                
                <Text style={MapStyles.position_text}>{Math.round(this.state.position[0]) + "   " + Math.round(this.state.position[1])}</Text>

                <View style={MapStyles.header_bar}>
                    <TouchableOpacity onPress={() => {this._backToHome()}}><Text style={MapStyles.worldname}>{this.props.worldname}</Text></TouchableOpacity>

                    <FlatList style={MapStyles.path_hist} horizontal inverted data={this.state.path_historic} renderItem={({item}) =>
                        <View style={{ marginTop: 38, flexDirection: "row", alignItems: "center"}}><Text style={{color: "rgba(238,238,238,0.4)", fontSize: 10, fontWeight: "bold"}}>&gt;</Text><TouchableOpacity onPress={() => this._backToCheer(item.path)}><Text style={MapStyles.historic_item}>{item.title}</Text></TouchableOpacity></View>
                    }></FlatList>
                </View>


                {this.props.editor ? <Editor
                    cancel={(id) => { if(id != -1){this.lastId = id; this._refreshAllCheers().then(() => { if(this.lastId >= 0) setTimeout(() => {this._teleportToCheer(this.lastId); this.setState({displayEditor: false});}, 100);}).catch((error) => alert(error))}}}
                    posX={this.state.position[0] + Dimensions.get("window").width / 2}
                    posY={this.state.position[1] + Dimensions.get("window").height / 2}
                    path={this.state.path}/> : null }


                {this.state.loading ?
                    <LoadingScreen></LoadingScreen> : null }

            </View>



        );
    }

    componentDidMount() {

        this.setState({position: [0, 0]});

        /* AsyncStorage.getItem("posX").then((result) => {
            if(result != null)
                this.setState({position: [Number.parseInt(result), this.state.position[1]]})
        })
        .catch((error) => {
            this.setState({position: [0, 0]})
        });
        AsyncStorage.getItem("posY").then((result) => {
            if(result != null)
                this.setState({position: [this.state.position[0], Number.parseInt(result)]})
        })
        .catch((error) => {
            this.setState({position: [0, 0]})
        }); */

        getNextGoodCheer(this.props.worldname).then((result) => {
            this.setState({loading: true, path: 'R', path_historic: []}, () =>
            {
                this.state.position =  [Math.round(result.data.posX), Math.round(result.data.posY)];
                this._refreshAllCheers().then(() => {
                    //alert(this.state.cheers_list.findIndex((item) => item.id == result.data.ID));
                    setTimeout(() => {
                        this._teleportToCheer(result.data.ID);
                        this.setState({loading: false});
                    }, 200);
                }).catch((error) => alert(error + result.data.ID));
            });
        }).catch((error) => alert(error));


        BackHandler.addEventListener("hardwareBackPress", () => {

            if(this.props.editor)
                this.props.editor = false;
            else {
                this._backToHome(this.rootPosition[0], this.rootPosition[1]);

            }
            return true;

        });

        this.props.navigation.addListener('focus', () => {

            Notifications.addNotificationResponseReceivedListener((notifs) => {
                const data = JSON.parse(notifs.notification.request.trigger.remoteMessage.data.body);

                this.setState({notifications: true, notifs_data: data});

            });

            if(this.props.route.params != null && this.props.route.params.newWorld == 2){
                this._backToHome();
            }
            else if(this.props.route.params != null) {

                const data = JSON.parse(this.props.route.params.notifs);
                this.props.dispatch({type: "SET_WORLD", value: data.worldname});
                this.setState({loading: true, path: data.path, path_historic: []}, () =>
                {
                    this.state.position =  [Math.round(data.posX), Math.round(data.posY)];
                    this._refreshAllCheers().then(() => {
                        //alert(this.state.cheers_list.findIndex((item) => item.id == result.data.ID));
                        this.setState({loading: true});
                        setTimeout(() => this._teleportToCheer(data.ID), 500);
                        this.setState({loading: false});
                    }).catch((error) => alert(error + data.ID));
                });
            }

            AsyncStorage.getItem("token").then((result) => {
                testAuth(result).then((isAuth) => {
                    if(!isAuth) {
                        this.props.navigation.navigate("Login");
                    }
                    else{
                        this.props.dispatch({type: "LOGIN", value: result});
                        this.setState({loading: true});
                        this._refreshAllCheers().then(() => this.setState({loading: false}));
                        setInterval(() => this._refreshAllCheers(), 1000);

                        if(this.state.notifications) {
                            this.props.dispatch({type: "SET_WORLD", value: this.state.notifs_data.worldname});
                            this.setState({loading: true, path: this.state.notifs_data.path, path_historic: []}, () =>
                            {
                                this.state.position =  [Math.round(this.state.notifs_data.posX), Math.round(this.state.notifs_data.posY)];
                                this._refreshAllCheers().then(() => {
                                    //alert(this.state.cheers_list.findIndex((item) => item.id == result.data.ID));
                                    this.setState({loading: true});
                                    setTimeout(() => this._teleportToCheer(this.state.notifs_data.ID), 500);
                                    this.setState({loading: false});
                                }).catch((error) => alert(error + this.state.notifs_data.ID));
                            });
                        }
                    }
                });
            });

            this.setState({loading: true});
            this._refreshAllCheers().then(() => this.setState({loading: false}));

        });

        this.props.dispatch({type: "INFINITY_HANDLER", value: this._infinityDiscover});
        //AsyncStorage.getItem("path").then((result) => this.setState({path: result}));

    }


}

export default connect((state) => {return {token: state.token, worldname: state.worldname, editor: state.editor}})(Map);
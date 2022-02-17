import React from "react";

import {View, Image, Text} from "react-native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import WorldList from "../Components/WorldList";
import Map from "../Components/Map";
import Favorites from "../Components/Favorites";
import AccountManager from "../Components/AccountManager";
import Editor from "../Components/Editor";
import {connect} from "react-redux";
import NotificationsScreen from "../Components/NotificationsScreen";
import {getNbNotifications} from "../CheerlandAPI/getter";


const Tab = createBottomTabNavigator();


class TabNav extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            nbNotifs: 0
        }
    }

    render() {

        return (
            <Tab.Navigator initialRouteName="MapView" backBehavior={"history"} screenOptions={{
                tabBarStyle: {
                    paddingBottom: 10,
                    height: 60,
                    backgroundColor: "#232323",
                    justifyContent: "center",
                    alignItems: "center",


                },

                tabBarInactiveTintColor: "white",
                tabBarActiveTintColor: "#993366",
                tabBarHideOnKeyboard: false,
                tabBarShowLabel: false,
            }}
            >
                <Tab.Screen name="Worlds" component={WorldList} options={
                    {
                        headerShown: true,
                        title: "Parcourir les mondes",
                        headerStyle: {
                            backgroundColor: "#1a1a1a",
                        },
                        headerTintColor: "#fff",
                        tabBarIcon: ({color, size}) => <Ionicons name={"list"} size={size} color={color}/>
                    }
                }
                ></Tab.Screen>

                <Tab.Screen name="Notifications" component={NotificationsScreen} options={
                    {
                        tabBarBadge: this.state.nbNotifs > 0 ? this.state.nbNotifs : null,
                        headerShown: true,
                        title: "Notifications",
                        headerStyle: {
                            backgroundColor: "#1a1a1a",
                        },
                        headerTintColor: "#fff",
                        tabBarIcon: ({color, size}) => <Ionicons name={"notifications-outline"} size={size} color={color}/>
                    }
                }
                ></Tab.Screen>

                <Tab.Screen name="MapView" component={Map} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({focused, color, size}) =>
                            <View style={{
                                top: -size,
                                borderRadius: 200,
                                padding: 5,
                                backgroundColor: "#993366",

                            }}>
                                <Image source={require("../assets/icon-app.png")}
                                       style={{width: size * 2, height: size * 2}}/>
                            </View>

                    }
                }
                    listeners={({navigation, route}) => ({
                        tabPress: (e) => {
                            // Prevent default action
                            this.props.infinity_handler(navigation.isFocused());
                        },
                    })}></Tab.Screen>

                <Tab.Screen name="Post" component={Editor} options={
                    {
                        headerShown: false,
                        tabBarIcon: ({color, size}) => <Ionicons name={"add-circle-outline"} size={size} color={color}/>
                    }
                } listeners={({navigation, route}) => ({
                    tabPress: (e) => {
                        // Prevent default action
                        e.preventDefault();

                        this.props.dispatch({type: "ENABLE_EDITOR"});
                    },
                })}
                ></Tab.Screen>

                <Tab.Screen name="Account" component={AccountManager} options={
                    {
                        headerShown: true,
                        title: "Compte",
                        headerStyle: {
                            backgroundColor: "#1a1a1a",
                        },
                        headerTintColor: "#fff",
                        tabBarIcon: ({color, size}) => <Ionicons name={"person-circle-outline"} size={size}
                                                                 color={color}/>
                    }
                }></Tab.Screen>
            </Tab.Navigator>
        );
    }

    componentDidMount() {
        setInterval(() => {
            getNbNotifications(this.props.token).then((result) => {
                this.setState({nbNotifs: result.data.count});
            });
        }, 5000);
    }

}

export default connect(state => { return {infinity_handler: state.infinity_handler, token: state.token}})(TabNav);

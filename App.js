import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import MainComponent from "./Components/MainComponent";

import {Provider} from "react-redux";
import Store from "./Store/configureStore";
import * as Notifications from "expo-notifications";


export default class App extends React.Component {

    render() {
        return (
            <Provider store={Store}>
                <NavigationContainer>
                    <View style={{flex: 1, overflow: "hidden"}}>
                        <MainComponent></MainComponent>
                    </View>
                </NavigationContainer>
            </Provider>
        );
    }

}



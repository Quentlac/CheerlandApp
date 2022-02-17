import React from "react";

import {View, Text, FlatList, TouchableOpacity} from "react-native";
import Notifications from "./Notifications";
import MainTheme from "../Styles/MainTheme";

import NotificationsStyles from "../Styles/NotificationsStyles";
import {getNotifications} from "../CheerlandAPI/getter";

import {connect} from "react-redux";

class NotificationsScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notifications: []
        }

        getNotifications(this.props.token).then((result) => {
            this.setState({notifications: result.data});
        });
    }

    render() {
        return(
            <View style={MainTheme.rootPage}>
                <FlatList data={this.state.notifications} renderItem={
                    ({item}) =>
                        <TouchableOpacity onPress={() => {

                                this.props.navigation.navigate("MapView", {notifs: item.data});

                            }
                        }><Notifications read={item.readed == 1 ? true : false } title={item.title} content={item.content} time={item.time}></Notifications></TouchableOpacity>
                }></FlatList>
            </View>
        );
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            getNotifications(this.props.token).then((result) => {
                this.setState({notifications: result.data});
            });
        });
    }


}

export default connect(state => { return { token: state.token }})(NotificationsScreen);
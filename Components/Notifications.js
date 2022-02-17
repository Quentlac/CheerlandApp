import React from "react";

import {View, Text, FlatList} from "react-native";

import NotificationsStyles from "../Styles/NotificationsStyles";

class Notifications extends React.Component {

    render() {
        return(
            <View style={[NotificationsStyles.notifications_box, {
                opacity: this.props.read ? 0.4 : 1
            }]}>
                <Text style={NotificationsStyles.title}>{this.props.title}</Text>
                <Text style={NotificationsStyles.notifications_box_txt}>{this.props.content}</Text>
                <Text style={NotificationsStyles.timecode}>{this.props.time}</Text>
            </View>
        );
    }


}

export default Notifications;
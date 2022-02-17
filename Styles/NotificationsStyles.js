import {StyleSheet} from "react-native";


const NotificationsStyles = StyleSheet.create({

    notifications_box: {
        marginHorizontal: 10,

        padding: 10,

        backgroundColor: "#1c1c1c",

        marginBottom: 10,
        borderRadius: 10,

        borderLeftWidth: 4,
        borderLeftColor: "#993366"
    },

    notifications_box_txt: {
        color: "white",
        fontSize: 15
    },

    section_title: {
        color: "white",
        fontSize: 20,
        margin: 20
    },

    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },

    timecode: {
        fontSize: 12,
        fontStyle: "italic",
        color: "white",
        marginTop: 10
    }




});

export default NotificationsStyles;
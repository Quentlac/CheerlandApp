import { StyleSheet } from "react-native";

const EditorStyle = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: "#363636",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 0,
    },

    input: {
        position: "absolute",

        alignSelf: "center",
        maxWidth: 300,
        minWidth: 20,

        minHeight: 110,

        top: "20%",

        fontSize: 20,
        textDecorationColor: "#fff",
        fontWeight: "bold",
        color: "#fff",


        backgroundColor: "#993366"
    },

    send_button: {
        position: "absolute",
        right: 15,
        bottom: 15,
    },

    media_button: {
        position: "absolute",
        left: 15,
        bottom: 15
    },

    camera_button:{
        position: "absolute",
        left: 15,
        bottom: 70,
    },

    back_button: {
        height: "60%",
        width: "20%",
        resizeMode: "contain",
    },

    close_button: {
        position: "absolute",
        top: 5,
        left: 5
    },

    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    image_preview:{
        position: "absolute",

        alignSelf: "center",
        maxWidth: 300,
        minWidth: 20,

        minHeight: 110,

        top: "20%",

        fontSize: 20,
        textDecorationColor: "#fff",
        fontWeight: "bold",
        color: "#fff",


        backgroundColor: "#993366"
    },

    action_icons: {
        maxWidth: 100,
        maxHeight: 50,

        margin: 10,

        resizeMode: "contain",
    },

    loading: {
        margin: 20
    },

    bottom_action_bar:{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    }


});


export default EditorStyle;
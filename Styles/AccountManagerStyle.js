import {StyleSheet} from "react-native";

const AccountManagerStyle = StyleSheet.create({

    username: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        padding: 7,
        backgroundColor: "#993366",
        borderRadius: 5,
        alignSelf: "flex-start",
        paddingLeft: 10,
        borderLeftWidth: 3,
        borderLeftColor: "white"
    },

    user_info_box: {
        backgroundColor: "#1c1c1c",
        margin: 10,

        padding: 20,

        borderRadius: 10,
        marginBottom: 30,
    },

    irl_name: {
        color: "white",
        fontSize: 20,
        marginTop: 10,
        fontWeight: "bold"
    },

    cheers_number: {
        color: "white",
    },

    settings_button: {
        fontSize: 20,
        color: "white",
        paddingLeft: 20,
        marginBottom: 10,
        paddingBottom: 8,
        marginHorizontal: 10,

        borderRadius: 5,

        borderBottomWidth: 2,
        borderBottomColor: "#5d5d5d",
        backgroundColor: "#1c1c1c",
        padding: 10

    },

    input: {
        backgroundColor: "#1c1c1c",
        color: "white",

        padding: 10,
        fontSize: 20,
        height: 50,

        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 10,
    }



});


export default AccountManagerStyle;
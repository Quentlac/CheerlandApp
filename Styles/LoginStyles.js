import { StyleSheet } from "react-native";

const LoginStyles = StyleSheet.create({
    root: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#2c2c2c"

    },

    icon: {
        width: 200,
        height: 100,
        marginBottom: 20,
        resizeMode: "contain"
    },

    desc: {
        color: "#c7c7c7",
        maxWidth: 330,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 16,
        margin: 10
    },

    title: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold"

    },

    input: {
        width: "85%",
        maxWidth: 350,
        padding: 20,
        margin: 10,

        backgroundColor: "#1a1a1a",
        fontSize: 20,
        color: "#d0d0d0",

        borderRadius: 5,
        fontWeight: "bold"
    },

    submit_button: {
        margin: 20
    },

    link: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        margin: 10
    },

    error: {
        color: "red",
        fontWeight: "bold",
        fontSize: 15
    }
});

export default LoginStyles;
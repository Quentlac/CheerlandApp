import { StyleSheet } from "react-native";


const CheersStyles = StyleSheet.create({

    root: {
        padding: 18,
        maxWidth: 350,

        backgroundColor: "#424242",
        borderRadius: 20,
        //borderColor: "#009999",
        //borderWidth: 1,
        //opacity: 0.5,

        //elevation: 5,


    },

    text: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
    image: {
        width: 250,
        height: 250,

        borderRadius: 10,
    },

    username: {
        color: "rgba(255,255,255,0.38)",
        fontWeight: "bold",
        marginLeft: 20,
        marginBottom: 3
    },

    ads_label: {
        color: "rgba(222,206,90,0.92)",
        fontWeight: "bold",
        marginHorizontal: 20,
        marginBottom: 3
    },

    certif: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        marginHorizontal: 5
    },

    userinfos: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center"
    }

});


export default CheersStyles;
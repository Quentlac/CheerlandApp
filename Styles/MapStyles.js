import { StyleSheet } from "react-native";

import {Dimensions} from "react-native";

const MapStyles = StyleSheet.create({

    background: {
        position: "absolute",

        width: Dimensions.get('window').width * 3,
        height: Dimensions.get('window').height * 3,

        backgroundColor: "#222",
        overflow: "hidden"

    },

    position_text: {
        position: "absolute",
        bottom: 5,
        left: 5,

        fontSize: 15,
        color: "white"

    },

    back_button: {
        position: "absolute",
        top: 50,
        left: 10,

        width: 50,
        height: 50,

    },

    size_text: {
        position: "absolute",
        bottom: 5,
        right: 5,

        fontSize: 15,
        color: "white"

    },

    header_bar: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        top: 0,
        width: "100%",

        right: 0,
        backgroundColor: "rgb(33,33,33)",

    
        height: 80,

    },

    worldname: {
        marginTop: 45,
        marginHorizontal: 5,
        padding: 4,
        borderRadius: 4,
        alignSelf: "flex-start",
        backgroundColor: "#993366",
        color: "white",
        fontWeight: "bold"
    },

    historic_item: {
        marginHorizontal: 5,
        padding: 4,
        borderRadius: 4,
        alignSelf: "flex-start",
        backgroundColor: "rgba(255,255,255,0.19)",
        color: "white",
        fontWeight: "bold"
    },

    path_hist: {
        marginLeft: 30,
    }


});


export default MapStyles;
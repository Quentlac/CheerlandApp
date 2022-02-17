import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Map from "../Components/Map";
import React from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import TabNav from "./TabNav";
import WorldCreator from "../Components/WorldCreator";
import WorldSearch from "../Components/WorldSearch";
import changePassword from "../Components/Settings/changePassword";
import changeEmail from "../Components/Settings/changeEmail";

const Stack = createNativeStackNavigator();

function MainStack(){
    return(
            <Stack.Navigator>
                <Stack.Screen name="Map" component={TabNav} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

                <Stack.Screen name="WorldCreator" component={WorldCreator} options={{
                    title: "Nouveau monde",
                    headerStyle: {
                        backgroundColor: "#1a1a1a",
                    },
                    headerTintColor: "#fff",
                }}/>

                <Stack.Screen name="WorldSearch" component={WorldSearch} options={{
                    title: "Rechercher un monde",
                    headerStyle: {
                        backgroundColor: "#1a1a1a",
                    },
                    headerTintColor: "#fff",
                }}/>


                <Stack.Screen name="ChangePassword" component={changePassword} options={{
                    title: "Changer de mot de passe",
                    headerStyle: {
                        backgroundColor: "#1a1a1a",
                    },
                    headerTintColor: "#fff",
                }}/>

                <Stack.Screen name="ChangeEmail" component={changeEmail} options={{
                    title: "Changer d'adresse email",
                    headerStyle: {
                        backgroundColor: "#1a1a1a",
                    },
                    headerTintColor: "#fff",
                }}/>
            </Stack.Navigator>
    );
}


export default MainStack;
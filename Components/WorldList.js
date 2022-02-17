import React from "react";

import {View, Text, FlatList, TouchableOpacity} from "react-native";
import MainTheme from "../Styles/MainTheme";
import WorldInfoCard from "./WorldInfoCard";
import WorldListStyles from "../Styles/WorldListTheme";

import {connect} from "react-redux";
import {getMyWorlds} from "../CheerlandAPI/getter";

class WorldList extends React.Component{



    constructor(props) {
        super(props);

        this.state = {
            world_array: []
        }

        getMyWorlds(this.props.token).then((result) => {
            this.setState({world_array: result.data})
        });
    }

    _setWorld = (worldname) => {
        this.props.dispatch({type: "SET_WORLD", value: worldname});
        this.props.navigation.navigate("MapView", { newWorld: 2 });
    }

    render(){
        return (
            <View style={MainTheme.rootPage}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("WorldCreator")}><Text style={WorldListStyles.text_button}> > Créer un nouveau monde</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("WorldSearch")}><Text style={WorldListStyles.text_button}> > Rejoindre un monde existant</Text></TouchableOpacity>

                <FlatList style={WorldListStyles.worldlist} data={this.state.world_array} keyExtractor={(item) => item.title} renderItem={
                    ({item}) => <TouchableOpacity onPress={() => this._setWorld(item.title)}><WorldInfoCard title={item.title} online={item.online} total={item.total_user} public={(item.public == 1)} /></TouchableOpacity>
                }/>
            </View>
        )
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            getMyWorlds(this.props.token).then((result) => {
                this.setState({world_array: result.data})
            });
        });
    }

}

export default connect(state => { return {token: state.token, worldname: state.worldname} })(WorldList);
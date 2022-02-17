

function worldReducer(state = {worldname: "cheerland", token: "", editor: false, infinity_handler: () => {return false}}, action){
    if(action.type === "SET_WORLD"){
        return {...state, worldname: action.value} || state;
    }
    else if(action.type === "LOGIN"){
        return {...state, token: action.value};
    }
    else if(action.type == "LOGOUT"){
        return {...state, token: ""};
    }
    else if(action.type == "ENABLE_EDITOR"){
        return {...state, editor: true};
    }
    else if(action.type == "DISABLE_EDITOR"){
        return {...state, editor: false};
    }
    else if(action.type == "INFINITY_HANDLER"){
        return {...state, infinity_handler: action.value};
    }
    else return state;
}

export default worldReducer;
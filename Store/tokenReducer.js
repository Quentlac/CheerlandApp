
const defaultToken = {token: ""};

function setToken(state = defaultToken, action){
    if(action.type === "LOGIN"){
        return {...state, token: action.value};
    }
    else if(action.type == "LOGOUT"){
        return {...state, token: defaultToken};
    }

    return state;
}

export default setToken;
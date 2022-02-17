import axios from "axios";

export function login(login, password, push_token){
    const url = "https://cheerland.fr/login.php";

    return axios.post(url, "username=" + login + "&password=" + password + "&push_token=" + push_token);
}


export function testAuth(token){

    return new Promise((resolve, reject) => {
        const url = "https://cheerland.fr/testAuth.php";

        axios.get(url, {headers: {"Auth": token}}).then((result) => {
            if(result.data.msg == "ACCESS_GRANTED")
                resolve(true);
            else if(result.data.msg == "ACCESS_DENIED")
                resolve(false);
            else
                reject("UNKNOW_REPONSE");
        }).catch((error) => reject(error));

    });

}

export function getUserInfo(token){
    const url = "https://cheerland.fr/accountManager.php?mode=get_info";

    return axios.get(url, {headers: {"Auth": token}});
}

export function changePasswordRequest(token, current, new_password){
    const url = "https://cheerland.fr/accountManager.php?mode=change_password";

    return axios.post(url, "current=" + current + "&new=" + new_password
    ,{headers: {"Auth": token}});
}

export function changeEmailRequest(token, mail){
    const url = "https://cheerland.fr/accountManager.php?mode=change_email";

    return axios.post(url, "mail=" + mail,{headers: {"Auth": token}});
}

export function deconnectRequest(token){
    const url = "https://cheerland.fr/accountManager.php?mode=deconnect";

    return axios.get(url,{headers: {"Auth": token}});
}
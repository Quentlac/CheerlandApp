import axios from "axios";


export function checkUsernameAvailable(username){

    const url = "https://cheerland.fr/register.php?mode=VERIF_USERNAME";

    return axios.post(url, "username=" + username);

}

export function checkMailAvailable(mail){

    const url = "https://cheerland.fr/register.php?mode=VERIF_MAIL";

    return axios.post(url, "mail=" + mail);

}

export function registerRequest(username, mail, password, name, firstname){
    const url = "https://cheerland.fr/register.php?mode=REGISTER";

    return axios.post(url,
        "username=" + username
        + "&mail=" + mail
        + "&password=" + password
        + "&name=" + name
        + "&firstname=" + firstname
    );
}
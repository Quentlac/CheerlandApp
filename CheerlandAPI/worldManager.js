import axios from "axios";

export function checkWorldnameAvailable(worldname){

    const url = "https://cheerland.fr/createWorld.php?mode=VERIF_WORLDNAME";

    return axios.post(url, "worldname=" + worldname);

}

export function createWorldRequest(token, worldname, isPublic, pin){
    const url = "https://cheerland.fr/createWorld.php?mode=ADD";

    return axios.post(url,
        "worldname=" + worldname
            +"&public=" + (isPublic ? 1:0)
            +"&pin=" + pin
        , { headers: {"Auth": token}});
}

export function searchWorlds(words){
    const url = "https://cheerland.fr/searchWorlds.php";

    return axios.get(url + "?words=" + words);

}

export function joinWorldRequest(token, worldname, pin){
    const url = "https://cheerland.fr/joinWorld.php";

    return axios.post(url, "worldname=" + worldname + "&pin=" + pin, { headers: {"Auth": token}});
}
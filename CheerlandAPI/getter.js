
import axios from "axios";

export function getCheersInArea(token, xStart, yStart, width, height, path, worldname){
    //Cette fonction retourne une promesse qui une fois résolue donne un objet json contenant la liste des cheers

    const url = "https://cheerland.fr/getCards.php?"
    + "posX=" + Math.round(xStart)
    + "&posY=" + Math.round(yStart)
    + "&width=" + Math.round(width)
    + "&height=" + Math.round(height)
    + "&path=" + path
    + "&worldname=" + worldname;

    return axios.get(url, {headers: {"Auth": token}});
}

export function getMyWorlds(token){
    const url = "https://cheerland.fr/getUserWorlds.php";

    return axios.get(url, {headers: {"Auth": token}});
}

export function getNextGoodCheer(worldname){
    const url = "https://cheerland.fr/goToGoodCheers.php?worldname=" + worldname;

    return axios.get(url);
}

export function getNotifications(token){
    const url = "https://cheerland.fr/getNotifs.php";
    return axios.get(url, {headers: {"Auth": token}});
}

export function getNbNotifications(token){
    const url = "https://cheerland.fr/getNotifs.php?mode=count";
    return axios.get(url, {headers: {"Auth": token}});
}


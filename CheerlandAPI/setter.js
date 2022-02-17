import axios from "axios";
import {FileSystemUploadType, uploadAsync} from "expo-file-system";

export function submitNewCheer(token, posX, posY, path, worldname, content, color, type="TEXT"){

    const url = "https://cheerland.fr/addCard.php";
    let data = {
        posX: Math.round(posX),
        posY: Math.round(posY),
        path: path,
        worldname: worldname,
        content: content,
        type: type,
        color: color
    };

    console.log(data);

    return axios.post(url,
        "posX=" + data.posX
        + "&posY=" + data.posY
        + "&path=" + data.path
        + "&worldname=" + data.worldname
        + "&content=" + data.content
        + "&type=" + data.type
        + "&color=" + data.color, { headers: {"Auth": token}});

}


export function uploadMedia(uri){
    const url = "https://cheerland.fr/upload.php";

    return uploadAsync(url, uri, {
        httpMethod: "POST",
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: "media"
    });
}
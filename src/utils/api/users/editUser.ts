import Axios from "axios";
import {baseUrl} from "../baseUrl.ts";
export interface UserData{
    name : string,
    job:string

}

export interface editUserProps{
    id : string,
    data:UserData
}

export function editUser({id,data}:editUserProps) {
    return Axios({
        url: `${baseUrl()}/api/users/${id}`,
        method: "PUT",
        data
    });
}

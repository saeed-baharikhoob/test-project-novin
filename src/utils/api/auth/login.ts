import Axios from "axios";
import {baseUrl} from "../baseUrl.ts";

export interface LoginProps{
    email : string,
    password:string
}

export function login(data:LoginProps) {
    return Axios({
        url: `${baseUrl()}/api/login`,
        method: "POST",
        data
    });
}

import Axios from "axios";
import {baseUrl} from "../baseUrl.ts";


export function deleteUser(id:string) {
    return Axios({
        url: `${baseUrl()}/api/users/${id}`,
        method: "DELETE",
    });
}

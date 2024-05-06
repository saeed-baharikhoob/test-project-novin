import Axios from "axios";
import {baseUrl} from "../baseUrl.ts";

export function getUsers(page : number) {
    return Axios({
        url: `${baseUrl()}/api/users?page=${page}`,
        method: "GET",
    });
}

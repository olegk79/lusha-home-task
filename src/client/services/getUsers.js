/*getting list of users from server*/
import axios from "axios";
export default async (skip,limit) => {
    return await axios({
        method: "GET",
        url : `/api/users?skip=${skip}&limit=${limit}`,
        json: true
    });
};
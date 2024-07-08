import { instance } from "./axiosBase";

export const login = async(data) => {
    return instance.post("http://localhost:8000/login",data)
        .then((res)=>res.data)
        .catch((err)=>err)
}

export const registerUser = async(data) => {
    const response = await instance.post("http://localhost:8000/register",data);
    return response;
}
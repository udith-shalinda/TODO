import { axiosClient, save_accessToken } from "./axios-client"

export const login = async (username: string, password: string) => {
    const data: any = await axiosClient.post('/auth/login', {
        username,
        password
    });
    save_accessToken(data.data.token);
    return data.data._doc;
}
export const register = async (username: string, password: string) => {
    const data = await axiosClient.post('/auth/newUser', {
        username,
        password
    });
    save_accessToken(data.data.token);
    return data.data._doc;
}
export const whoAmI = async () => {
    return await axiosClient.get('/auth/whoami');
}
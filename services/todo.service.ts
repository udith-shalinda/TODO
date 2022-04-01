import { axiosClient } from "./axios-client"

export const addTODO = async (name: string, completed: boolean) => {
    const data: any = await axiosClient.post('/todo/add', {
        name,
        completed
    });
    return data.data;
}

export const updateTODO = async (id: string, name: string, completed: boolean) => {
    const data = await axiosClient.put('/todo/edit', {
        _id: id,
        name,
        completed
    });
    return data.data;
}

export const deleteTODO = async (id: string) => {
    const data = await axiosClient.delete(`/todo/delete/${id}`);
    return data.data;
}

export const getMyTODOs = async () => {
    const data = await axiosClient.get(`/todo/getMyTodo`);
    return data.data;
}
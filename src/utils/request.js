import axios from 'axios';

const request = axios.create({
    baseURL: 'http://localhost:3001/',
});

export const getMethod = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const postMethod = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};

export const putMethod = async (path, options = {}) => {
    const response = await request.put(path, options);
    return response.data;
};

export const deleteMethod = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};

export default request;
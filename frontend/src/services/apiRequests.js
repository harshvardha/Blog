import axios from "axios";

const baseUrl = "http://localhost:5000";
const api = axios.create();

// authentication api calls
export const authenticationApiRequests = {
    register: (registerDetails) => api.post(`${baseUrl}/authentication/register`, registerDetails),
    login: (loginDetails) => api.post(`${baseUrl}/authentication/login`, loginDetails)
};

// user api calls
export const userApiRequests = {
    updateProfile: (profileDetails, accessToken) => {
        api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/user/updateProfile`, profileDetails);
    },
    getUserById: (userId) => api.get(`${baseUrl}/user/${userId}`)
}

// blog api calls
export const blogApiRequests = {
    create: (blogDetails, accessToken) => {
        api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        return api.post(`${baseUrl}/blogs/create`, blogDetails)
    },
    update: (blogId, blogDetails, accessToken) => {
        api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        return api.put(`${baseUrl}/blogs/update/${blogId}`, blogDetails);
    },
    getBlogById: (blogId) => api.get(`${baseUrl}/blogs/blogById/${blogId}`),
    delete: (blogId, accessToken) => {
        api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        return api.delete(`${baseUrl}/blogs/delete/${blogId}`);
    },
    getAllBlogs: () => api.get(`${baseUrl}/blogs/all`),
    getBlogByUserId: (accessToken) => {
        api.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        return api.get(`${baseUrl}/blogs/blogsByUserId`);
    }
}
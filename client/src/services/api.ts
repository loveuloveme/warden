import axios from "axios";


const api = axios.create({
    baseURL: "http://localhost:3000/",
    withCredentials: true
});


export const signUp = (email: string, password: string) => {
    return api.post('/signup', {
        email,
        password,
    });
};

export const signIn = (email: string, password: string) => {
    return api.post('/signin', {
        email,
        password,
    });
};
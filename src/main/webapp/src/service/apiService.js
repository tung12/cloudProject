import Axios from "axios";


export let MAIN_API = Axios.create({
    //BE local
    baseURL: '/api'
    //BE production
     //baseURL: 'https://cloudproject123.herokuapp.com/api'
});

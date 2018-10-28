import Axios from "axios";


export let MAIN_API = Axios.create({
    //BE local
    //baseURL: 'http://localhost:8080/api'
    //BE production
     baseURL: 'https://cloudproject123.herokuapp.com/api'
});
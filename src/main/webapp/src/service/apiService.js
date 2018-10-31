import Axios from "axios";


export let MAIN_API = Axios.create({
    //BE local
    baseURL: ''
    //BE production
     //baseURL: 'https://cloudproject123.herokuapp.com/api'
});
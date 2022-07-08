import axios from "axios";

const instance = axios.create({
    //the api url
    baseURL : 'https://us-central1-clone-33407.cloudfunctions.net/api'
});

export default instance; 
// 'http://localhost:5001/clone-33407/us-central1/api' 
import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-burger-2eb8d-default-rtdb.firebaseio.com/'
});

export default instance;
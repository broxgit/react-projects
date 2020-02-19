import axios from 'axios';

const instance = axios.create({
   baseURL: 'https://react-my-burger-c280f.firebaseio.com/'
});

export default instance;
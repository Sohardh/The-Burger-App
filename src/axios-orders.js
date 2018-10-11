import axios from 'axios';

const instance = axios.create( {
	baseURL: 'https://react-burger-app-dd058.firebaseio.com/'
});

export default instance;

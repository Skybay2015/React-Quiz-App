import axios from 'axios';


export default axios.create({
    baseURL: 'https://react-app-quiz-e57e3.firebaseio.com/',
});
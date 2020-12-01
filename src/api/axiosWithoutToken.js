import axios from 'axios';

export default axios.create({
  baseURL: 'https://powerful-taiga-83278.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

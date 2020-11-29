import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
  headers: {
    'Content-Type': 'application/json',
  },
  // params: {
  //   apiKey: '2b0715ea3ed94024a9bc6afc798e46ba',
  // },
});

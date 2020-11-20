import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.spoonacular.com/recipes',
  headers: {
    'Content-Type': 'application/json',
  },
  // params: {
  //   apiKey: '18a0b5f666f44a3694c8a43303d699ff',
  // },
});

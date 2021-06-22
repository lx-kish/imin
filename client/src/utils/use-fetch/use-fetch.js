import axios from 'axios';

import config from '../../axios.config';

export const postData = async (route, values) => {
    
  return await axios.post(route, values, config);
};

export const getData = async (route) => {
    
  return await axios.get(route, config);
};

export const patchData = async (route, values) => {
    
  return await axios.patch(route, values, config);
};
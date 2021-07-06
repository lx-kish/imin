import axios from 'axios';

import config from '../../axios.config';

export const fetchData = async (method, url, data) => {
  console.log(
    '%c use-fetch.fetchData, data ===> ',
    'color: blue; font-weight: bold;',
    method,
    url,
    data
  );
  // if (method === 'PATCH') data.append('_method', 'PATCH');
  return await axios({
    method,
    url,
    data,
    config
  })
};
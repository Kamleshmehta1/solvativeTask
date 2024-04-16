import axios from 'axios';
import { key as secretkey } from '../utils/apikey';

export const fetchData = async ({ inputs, pagination }) => {
  const options = {
    method: 'GET',
    url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
    params: {
      countryIds: 'IN',
      namePrefix: inputs.search,
      limit: pagination?.toString(),
    },
    headers: {
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
      'x-rapidapi-key': secretkey, // get key from https://rapidapi.com/wirefreethought/api/geodb-cities/
    },
  };
  return await axios(options);
};

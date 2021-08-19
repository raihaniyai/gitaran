import encodeQueryData from '@utils/encodeQueryData';
import { TwitterV1 } from 'constants/endpoints';

const axios = require('axios');
const endpoint = `${TwitterV1}/users/show.json`;

export default async (req, res) => {
  const parameter = {
    screen_name: req.query.username
  };

  const token = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
  const url = endpoint + '?' + encodeQueryData(parameter);
  const requestConfig = {
    headers: { Authorization: 'Bearer ' + token }
  };

  const response = await axios.get(url, requestConfig);
  res.status(200).json({ data: response.data });
}
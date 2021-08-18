import encodeQueryData from '@utils/encodeQueryData';
import { TwitterV1 } from 'constants/endpoints';

const axios = require('axios');
const endpoint = `${TwitterV1}/friendships/show.json`;

export default async (req, res) => {
  const parameter = {
    source_screen_name: req.query.sourceUsername,
    target_screen_name: req.query.targetUsername,
  };

  const token = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
  const url = endpoint + '?' + encodeQueryData(parameter);
  const requestConfig = {
    headers: { Authorization: 'Bearer ' + token }
  };

  const response = await axios.get(url, requestConfig);
  res.status(200).json({ data: response.data });
}
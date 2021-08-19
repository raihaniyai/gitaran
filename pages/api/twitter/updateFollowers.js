import { db } from '@utils/firebase';
import encodeQueryData from '@utils/encodeQueryData';
import { TwitterV1 } from '@constants/endpoints';
import findCommonElements from '@utils/findCommonElements';

const axios = require('axios');
const endpoint = `${TwitterV1}/followers/ids.json`;

const validateUpdateFollowers = bodyRequest => {
  let err;

  if (!bodyRequest.username || bodyRequest.username === '') {
    err = Error('Missing username (VGF02)');
    return err;
  }

  return err;
};

export default async (req, res) => {
  const { username } = req.query;
  const followerIds = [];
  let cursor = -1;

  const token = process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN;
  const requestConfig = {
    headers: { Authorization: 'Bearer ' + token }
  };

  const err = validateUpdateFollowers(req.query);

  if (err) {
    res.status(400).json({
      status: 400,
      messageError: err.message,
    });
  }

  const socialMediaPath = db.ref(`bank-jago/socialMedia/twitter`);
  const snapshot = await socialMediaPath.get();
  const twitterList = snapshot.val();
  const index = twitterList.map(e => e.username).indexOf(username);

  if (index !== -1) {
    const followersPath = socialMediaPath.child(`${index}/followers`);
    const followersList = await followersPath.get();
    const existingFollowersIds = Object.keys(followersList) || [];

    while (cursor !== 0) {
      const parameter = {
        cursor: cursor,
        screen_name: username,
        skip_status: true,
        include_user_entities: false,
        count: 5000,
      };

      const url = endpoint + '?' + encodeQueryData(parameter);
      const response = await axios.get(url, requestConfig);

      const list = response.data.ids;
      followerIds.push(...list);
      const res = list.reduce((acc, curr) => (acc[curr] = { followDate: Date.now() }, acc), {});

      followersPath.update(res);

      if (findCommonElements(existingFollowersIds, list)) {
        cursor = 0;
      } else {
        cursor = response.data.next_cursor;
      }
    }
  } else {
    res.status(400).json({ messageError: 'Username not registered yet' });
  }

  res.status(200).json({ data: { total: followerIds.length } });
}
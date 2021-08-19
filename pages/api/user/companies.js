import { db } from '@utils/firebase';

export default async (req, res) => {
  var userPath = db.ref(`users/${userId}/companies`);
  userPath.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).json({ status: 200, data });
  });
};

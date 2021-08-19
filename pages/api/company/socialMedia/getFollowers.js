import { db } from '@utils/firebase';

const validateGetFollowers = bodyRequest => {
  let err;

  if (!bodyRequest.companyId || bodyRequest.companyId === '') {
    err = Error('Missing company ID (VGF01)');
    return err;
  }

  return err;
};

export default async (req, res) => {
  const err = validateGetFollowers(req.query);

  if (err) {
    res.status(400).json({
      status: 400,
      messageError: err.message,
    });
  }

  const socialMediaPath = db.ref(`bank-jago/socialMedia/twitter`);
  const snapshot = await socialMediaPath.get();
  const twitterList = snapshot.val();

  res.status(200).json({ status: 200, data: { twitter: twitterList } });
};

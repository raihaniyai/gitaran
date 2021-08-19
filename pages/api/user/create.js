import { db } from '@utils/firebase';

export default async (req, res) => {
  const userId = req.body.userId;
  const userPath = db.ref(`users/${userId}`);

  const userData = {
    createTime: Date.now(),
    name: req.body.name,
    email: req.body.email,
  };

  userPath.update(userData);
  res.status(200).json({
    status: 200,
    data: {
      id: userId,
    },
  });
};

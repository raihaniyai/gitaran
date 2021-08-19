import { db } from '@utils/firebase';

export default async (req, res) => {
  const { companyId, promotionId } = req.query;

  var promotionData = db.ref(`bank-jago/promotions/${promotionId}`);
  promotionData.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).json({ data })
  });
}
import db from '@utils/db';

export default async (req, res) => {
  const { companyId, promotionId } = req.query;

  var promotionData = db.ref(`companies/${companyId}/promotions/${promotionId}`);
  promotionData.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).json({ data })
  });
}
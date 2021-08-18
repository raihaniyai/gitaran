import db from '@utils/db';

export default async (req, res) => {
  const { companyId } = req.query;

  var promotionList = db.ref(`companies/${companyId}/promotions`);
  promotionList.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).json({ data })
  });
}
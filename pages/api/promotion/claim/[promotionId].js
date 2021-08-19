import { db } from '@utils/firebase';

export default async (req, res) => {
  const { companyId, promotionId } = req.query;

  const claimedData = db.ref(`companies/${companyId}/promotions/${promotionId}/claimed`);
  claimedData.push('test');
  res.status(200).json({
    status: 200,
    data: {
      id: promotionId,
    },
  });

  res.status(200).json({ data });
}

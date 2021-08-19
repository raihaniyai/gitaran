import { db } from '@utils/firebase';

export default async (req, res) => {
  const { promotionId } = req.body;

  // const snapshot = await claimedData.get();
  const claimedData = db.ref(`bank-jago/promotions/${promotionId}/claimed`);
  claimedData.transaction(function (searches) {
    if (searches) {
      searches = searches + 1;
    }
    return searches || 1;
  });

  res.send({
    data: { id: promotionId.toUpperCase() },
  });

  return;
}

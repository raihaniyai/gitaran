import db from '@utils/db';

const validateUpdatePromotion = bodyRequest => {
  let err;

  if (!bodyRequest.promotionId || bodyRequest.promotionId === '') {
    err = Error('Missing promotion ID (VUP01)');
    return err;
  }

  if (!bodyRequest.companyId || bodyRequest.companyId === '') {
    err = Error('Missing company ID (VUP02)');
    return err;
  }

  if (!bodyRequest.name || bodyRequest.name === '') {
    err = Error('Missing company name (VUP03)');
    return err;
  }

  if (!bodyRequest.totalPromo || bodyRequest.totalPromo === 0) {
    err = Error('Missing total promo (VUP04)');
    return err;
  }

  if (!bodyRequest.startDate || bodyRequest.startDate === '') {
    err = Error('Missing start date (VUP05)');
    return err;
  }

  if (!bodyRequest.endDate || bodyRequest.endDate === '') {
    err = Error('Missing end date (VUP06)');
    return err;
  }

  return err;
}

export default async (req, res) => {
  const err = validateUpdatePromotion(req.body);

  if (!err) {
    const promotionId = req.body.promotionId;
    const promotionPath = db.ref(`companies/${req.body.companyId}/promotions/${promotionId}`);
    const promotionName = req.body.name;
    const totalPromo = req.body.totalPromo;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const username = req.body.username;

    const promotionData = {
      updateTime: Date.now(),
      promotionName,
      totalPromo,
      startDate,
      endDate,
      username,
    };

    promotionPath.update(promotionData);
    res.status(200).json({
      status: 200,
      data: {
        id: promotionId,
        ...promotionData,
      },
    });
  } else {
    res.status(400).json({
      status: 400,
      messageError: err.message,
    });
  }
};

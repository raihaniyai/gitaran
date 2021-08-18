import db from '@utils/db';

const validateCreatePromotion = bodyRequest => {
  let err;

  if (!bodyRequest.companyId || bodyRequest.companyId === '') {
    err = Error('Missing company ID (VCP01)');
    return err;
  }

  if (!bodyRequest.name || bodyRequest.name === '') {
    err = Error('Missing company name (VCP02)');
    return err;
  }

  if (!bodyRequest.totalPromo || bodyRequest.totalPromo === 0) {
    err = Error('Missing total promo (VCP03)');
    return err;
  }

  if (!bodyRequest.startDate || bodyRequest.startDate === '') {
    err = Error('Missing start date (VCP04)');
    return err;
  }

  if (!bodyRequest.endDate || bodyRequest.endDate === '') {
    err = Error('Missing end date (VCP05)');
    return err;
  }

  return err;
}

export default async (req, res) => {
  const err = validateCreatePromotion(req.body);

  if (!err) {
    const promotionName = req.body.name;
    const promotionId = promotionName.toLowerCase().replace(/\s/g, '-');
    const promotionPath = db.ref(`companies/${req.body.companyId}/promotions/${promotionId}`);
    const totalPromo = req.body.totalPromo;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    // optional field
    const description = req.body.description || '';

    const promotionData = {
      createTime: Date.now(),
      updateTime: Date.now(),
      promotionName,
      totalPromo,
      startDate,
      endDate,
      description,
    };

    promotionPath.set(promotionData);
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

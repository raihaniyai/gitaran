import db from '@utils/db';

const validateUpdateCompany = bodyRequest => {
  let err;

  if (!bodyRequest.name || bodyRequest.name === '') {
    err = Error('Missing company name (VUC01)');
    return err;
  }

  if (!bodyRequest.website || bodyRequest.website === '') {
    err = Error('Missing company website (VUC02)');
    return err;
  }

  if (bodyRequest.socialMedia) {
    if (bodyRequest.socialMedia.twitter) {
      bodyRequest.socialMedia.twitter.forEach(tw => {
        if (!tw.username || !tw.id) {
          err = Error('Missing twitter data (VUC03)');
          return err;
        }
      });
    }
  }

  return err;
}

export default async (req, res) => {
  const err = validateUpdateCompany(req.body);

  if (!err) {

    const companyData = {
      updateTime: Date.now(),
      companyName,
      socialMedia,
      website,
    };

    companiesPath.update(companyData);
    res.status(200).json({
      status: 200,
      data: {
        id: promotionId,
        ...companyData,
      },
    });
  } else {
    res.status(400).json({
      status: 400,
      messageError: err.message,
    });
  }
};

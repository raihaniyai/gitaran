import db from '@utils/db';

const validateCompanyData = bodyRequest => {
  let err;

  if (!bodyRequest.name || bodyRequest.name === '') {
    err = Error('Missing company name');
    return err;
  }

  if (!bodyRequest.website || bodyRequest.website === '') {
    err = Error('Missing company website');
    return err;
  }

  if (bodyRequest.socialMedia) {
    if (bodyRequest.socialMedia.twitter) {
      bodyRequest.socialMedia.twitter.forEach(tw => {
        if (!tw.username || !tw.id) {
          err = Error('Missing twitter data');
          return err;
        }
      });
    }
  }

  return err;
}

export default async (req, res) => {
  const err = validateCompanyData(req.body);

  if (!err) {
    const companyName = req.body.name;
    const companyId = companyName.toLowerCase().replace(/\s/g, '-');
    const companiesPath = db.ref(`companies/${companyId}`);
    const socialMedia = req.body.socialMedia;
    const website = req.body.website;

    const companyData = {
      "createTime": Date.now(),
      "updateTime": Date.now(),
      "name": companyName,
      socialMedia: socialMedia ?? null,
      website,
    };

    companiesPath.set(companyData);
    res.status(200).json({
      status: 200,
      data: {
        id: companyId,
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

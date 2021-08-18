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

  if (bodyRequest.socialMedia.twitter) {
    bodyRequest.socialMedia.twitter.forEach(tw => {
      if (!tw.username || !tw.id) {
        err = Error('Missing twitter data');
        return err;
      }
    });
  }

  return err;
}

export default async (req, res) => {
  const companiesPath = db.ref(`companies`);
  const err = validateCompanyData(req.body);

  if (!err) {
    const newCompany = companiesPath.push();
    const companyId = newCompany.key;
    const companyName = req.body.name;
    const socialMedia = req.body.socialMedia;
    const twitter = socialMedia.twitter;
    const website = req.body.website;

    const companyData = {
      "createTime": Date.now(),
      "updateTime": Date.now(),
      "name": companyName,
      "socialMedia": {
        "twitter": twitter,
      },
      "website": website,
    };

    newCompany.set(companyData);
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

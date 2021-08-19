import { db } from '@utils/firebase';

const validateSocialMedia = bodyRequest => {
  let err;

  if (!bodyRequest.companyId || bodyRequest.companyId === '') {
    err = Error('Missing company ID (VSM01)');
    return err;
  }

  if (!bodyRequest.socialMedia) {
    err = Error('Missing social media parameter (VSM02)');
    return err;
  }

  if (bodyRequest.socialMedia.twitter) {
    bodyRequest.socialMedia.twitter.forEach(tw => {
      if (!tw.username || !tw.id) {
        err = Error('Missing twitter data (VSM03)');
        return err;
      }
    });
  }

  return err;
}

export default async (req, res) => {
  const err = validateSocialMedia(req.body);

  if (!err) {
    const companyId = req.body.companyId;
    const companiesPath = db.ref(`companies/${companyId}/socialMedia`);
    const socialMedia = req.body.socialMedia;

    const companyData = {
      "createTime": Date.now(),
      "updateTime": Date.now(),
      socialMedia: socialMedia,
    };

    companiesPath.update(socialMedia);
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

import db from '@utils/db';

export default async (req, res) => {
  var companiesPath = db.ref('companies');
  companiesPath.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).json({ data })
  });
};

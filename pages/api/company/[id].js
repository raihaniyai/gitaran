import db from '@utils/db';

export default async (req, res) => {
  const { id } = req.query;

  var starCountRef = db.ref(`companies/${id}`);
  starCountRef.on('value', (snapshot) => {
    const data = snapshot.val();
    res.status(200).json({ data })
  });
}
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    console.log(data);
    return res.status(200).json({ ok: true });
  }

  res.status(405).json({ message: 'Method not allowed' });
}

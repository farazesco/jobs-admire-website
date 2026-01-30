import cookie from 'cookie';

export default function handler(req, res) {
  const cookies = cookie.parse(req.headers.cookie || '');
  const username = cookies.username || 'Guest';

  res.status(200).json({ username });
}

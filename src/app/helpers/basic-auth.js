async function BasicAuth(req, res, next) {
  console.log(req.path);
  console.log('PATH');
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('Basic ') === -1
  ) {
    return res.status(401).json({ message: 'Missing Authorization Header' });
  }

  const base64Credentials = req.headers.authorization.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString(
    'ascii'
  );
  const [username, password] = credentials.split(':');

  if (
    !(
      username === process.env.AUTH_USER &&
      password === process.env.AUTH_PASSWORD
    )
  ) {
    return res
      .status(401)
      .json({ message: 'Invalid Authentication Credentials' });
  }

  next();
}

module.exports = BasicAuth;

import jwt from 'jsonwebtoken';

// This is your middleware function
async function verifyToken(req, res, next) {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        message: 'You are not logged in. Please log in!',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); // Don't return next(), just call it
  } catch (err) {
    console.error(err); // Log for debugging
    return res.status(401).json({
      message: 'Invalid or expired token.',
    });
  }
}

export default verifyToken;
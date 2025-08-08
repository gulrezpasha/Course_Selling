import jwt from 'jsonwebtoken';

const userMiddleware = (req, res, next) => {
  try {
      
      const authHeader = req.headers.authorization || '';
      console.log("Token string (raw):", authHeader);  // should be: Bearer xxxxx
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    console.log("Actual token only:", token);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const secret = process.env.JWT_USER_PASSWORD || 'user123';

    console.log('Token string (raw):', token, token.length);


    // Verify token once
    const decoded = jwt.verify(token, secret);

    // Attach to request
    req.user = decoded;      // user info from token
    req.userId = decoded.id; // your userId

    console.log("User from req:", req.user);

    next();

  } catch (error) {
    console.error("Invalid token or expired token", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default userMiddleware;

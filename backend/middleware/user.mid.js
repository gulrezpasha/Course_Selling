// import jwt from "jsonwebtoken";
// import config from "../config.js";

// function userMiddleware(req,res,next){

// const authHeader=req.headers.authorization;




// if(!authHeader || !authHeader.startsWith("Bearer")){
//     return res.status(401).json({errors:"No token provided"});
// }
// const token=authHeader.split(" ")[1];

// try {
//     // console.log("Token:", req.headers.authorization);

//    const decoded=jwt.verify(token,config.JWT_USER_PASSWORD);
// //    const userId = req.userId;

//    req.userId=decoded.id;
//    next();
// } catch (error) {
//     res.status(401).json({errors:"Invalid token "});
//     console.log("Invalid token or expired token",error);
// }

// }

// export default userMiddleware;


// import jwt from "jsonwebtoken";

// function userMiddleware(req, res, next) {
//     console.log("userMiddleware running");
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ errors: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_USER_PASSWORD);
//     req.user = decoded;
//     req.userId = decoded.id;

//     console.log("User from req:", req.user);
//     console.log("UserId:", req.userId);

//     next();
//   } catch (error) {
//     console.error("Invalid token or expired token", error);
//     return res.status(401).json({ errors: "Invalid token or expired token" });
//   }
// }

// export default userMiddleware;


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

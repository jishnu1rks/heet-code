import jwt from "jsonwebtoken";
import "dotenv/config";

export const auth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ msg: "you are not authorized" });
  }

  try {
    const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
    console.log("Token is valid:", decoded);
    if (decoded && decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      res.status(401).send({ msg: "please check the token" });
    }
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("Invalid token:", error.message);
      // Handle invalid token, e.g., request authentication
      res.status(500).send({ msg: "please check the token" });
    } else {
      // Handle other errors
      console.error("Token verification failed:", error);
    }
  }
};

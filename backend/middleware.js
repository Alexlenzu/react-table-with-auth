const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send("Forbidden");
    }
    try {
      const decoded = jwt.verify(token, "alexander-key");
      req.user = decoded;
    } catch (err) {
      return res.status(401).send("Unauthorized");
    }
    return next();
  };

module.exports = verifyToken
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
module.exports = (req, res, next) => {
  // get auth header value
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    //   split at the space

    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, keys.JWT, (err, authData) => {
      if (err) {
        return res.status(403).json({ error: "forbidden" });
      }
      req.user = authData;
      next();
    });
  } else {
    // forbiddon
    res.status(403).json({
      error: "Invalid",
    });
  }
};

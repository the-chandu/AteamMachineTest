const passport = require("passport");
const { sendErrorResponse } = require('../utils/common');


const authenticate = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (!user) {
        const error = new Error("Unauthorized");
        error.statusCode = 400;
        return sendErrorResponse(res, error, "Unauthorized");
    } 

    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticate;

const passport = require('passport');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require("../config/serverConfig");
const { sendSuccessResponse, sendErrorResponse } = require('../utils/common');

const login = (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user){ 
            const newError = new Error(info.message);
            newError.statusCode = 400;
            return sendErrorResponse(res, newError, info.message);
        }
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        return sendSuccessResponse(res, {token}, "Login was a success", 200);
    })(req, res, next);
};

module.exports = {
    login
}
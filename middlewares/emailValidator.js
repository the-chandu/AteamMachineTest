const fs = require('fs');
const path = require('path');
const { sendErrorResponse } = require('../utils/common');

const blacklistPath = path.join(__dirname, '../config/blacListedEmails.json');

const blacklistedDomains = JSON.parse(fs.readFileSync(blacklistPath, 'utf8')).domains;

const validateEmail = (req, res, next) => {
    try {
        let { email, username } = req.body;
        email = email ?? username

        if (!email) {
            const error = new Error('Email is required.');
            error.statusCode = 400;
            return sendErrorResponse(res, error, 'Email is required.');
        }

        const domain = email.split('@')[1];

        if (!domain) {
            const error = new Error("Invalid email format.");
            error.statusCode = 400;
            return sendErrorResponse(res, error, "Invalid email format.");
        }

        if (blacklistedDomains.includes(domain)) {
            const error = new Error("Use a valid work email.");
            error.statusCode = 400;
            return sendErrorResponse(res, error, "Use a valid work email.");
        }

        next();
    } catch (error) {
        console.error("Error in email validation middleware:", error);
        error.statusCode = 500;
        return sendErrorResponse(res, error, "Internal Server Error");
    }
};

module.exports = validateEmail;

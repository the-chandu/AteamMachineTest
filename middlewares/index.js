module.exports = {
    authenticate: require("./authMiddleware.js"),
    authorize: require("./authorizeMiddleware.js"),
    validateWorkEmail: require("./emailValidator.js"),
    validationMiddleware: require("./validationMiddleware.js")
}
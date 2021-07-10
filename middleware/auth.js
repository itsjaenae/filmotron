/**
 * if user is authenicated then go to next middleware
 */
const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send();
};
/**
 * if user is not authenicated then go to next middleware
 */
const checkNotAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send();
};

module.exports = { checkAuth, checkNotAuth };

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../model/user');

const PassportConfig = (passport) => {
    const validPassword = async (password, user) => {
        if (await bcrypt.compare(password, user.password)) {
            return true;
        }
        return false;
    };

    const verifyCB = async (username, password, done) => {
        try {
            const user = await User.findOneByUsername(username);
            // if user does not exist
            if (!user) {
                return done(null, false);
            }
            const passwordIsValid = await validPassword(password, user);
            // if password is not valid
            if (!passwordIsValid) {
                return done(null, false);
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    };
    // options is not necessary, Default options
    const options = {
        usernameField: 'username',
        passwordField: 'password'
    };
    const localStrategy = new LocalStrategy(options, verifyCB);

    passport.use(localStrategy);

    // put user id in session
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    // get user id from session and find user in database
    passport.deserializeUser(async (userId, done) => {
        try {
            const user = await User.findById(userId);
            if (user) {
                done(null, user);
            }
        } catch (err) {
            done(err);
        }
    });
};
module.exports = PassportConfig;

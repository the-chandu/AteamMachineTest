const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require('bcryptjs');

const { JWT_SECRET } = require("../config/serverConfig");
const { AuthRepository } = require('../repository');

const authRepository = new AuthRepository();

//LocalStrategy for login
passport.use(
    new LocalStrategy(
        { usernameField: 'username', passwordField: 'password' },
        async (email, password, done) => {
            try {
                const user = await authRepository.getUserByEmail(email);
                if (!user) return done(null, false, { message: 'User not found' });
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) return done(null, false, { message: 'Wrong password' });
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

// JWT Strategy for protected routes
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  };
  
  passport.use(
    new JwtStrategy(opts, async (jwtPayload, done) => {
      try {
        const user = await authRepository.getUserById(jwtPayload.id);
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      } catch (err) {
        return done(err, false);
      }
    })
  );

module.exports = passport;

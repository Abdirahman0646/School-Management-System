const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, Role } = require('../models');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails[0] && profile.emails[0].value;
        if (!email) {
          return done(null, false, { message: 'No email found from Google.' });
        }

        let user = await User.findOne({ where: { email }, include: Role });

        if (!user) {
          const defaultRole = await Role.findOne({ where: { role_name: 'Student' } });
          user = await User.create({
            name: profile.displayName || 'Student',
            email,
            password_hash: 'oauth',
            role_id: defaultRole ? defaultRole.id : null
          });
          user = await User.findOne({ where: { id: user.id }, include: Role });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;

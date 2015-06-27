var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, config) {
  var passport = require('passport');
  app.use(passport.initialize());
  app.use(passport.session());


  //TODO: Implement serialize and deserialize.
  passport.serializeUser(function(user, done) {
    // done(null, user.id);
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {
    // User.findById(id, function (err, user) {
    //   done(err, user);
    // });
    done(null, id);
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  //////////////////////////////////////////////////

  passport.use(new GoogleStrategy({
      clientID: config.auth.google.clientID,
      clientSecret: config.auth.google.clientSecret,
      callbackURL: config.auth.google.callbackURL
    },
    function (accessToken, refreshToken, profile, done) {
      if (!(profile && profile.id)) {
        return done('The user\'s profile doesn\'t have an id.');
      }

      done(null, {
        id: 'google.' + profile.id,
        name: profile.displayName || 'Unknown',
        photo: (profile.photos || [{}])[0].value,
        verified: (profile._json || {}).verified || false
      });
    }
  ));

  app.get('/auth/google',
    passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/userinfo.profile' })
  );

  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
      res.redirect('/');
  });

  //////////////////////////////////////////////////

  passport.use(new FacebookStrategy({
      clientID: config.auth.facebook.clientID,
      clientSecret: config.auth.facebook.clientSecret,
      callbackURL: config.auth.facebook.callbackURL,
      profileFields: ["id", "photos", "displayName", "verified"]
    },
    function (accessToken, refreshToken, profile, done) {
      if (!(profile && profile.id)) {
        return done('The user\'s profile doesn\'t have an id.');
      }
      
      done(null, {
        id: 'facebook.' + profile.id,
        name: profile.displayName || 'Unknown',
        photo: profile._json.picture.data.url,
        verified: (profile._json || {}).verified || false
      });
    }
  ));

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/');
  });
};
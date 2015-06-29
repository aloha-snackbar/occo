module.exports = {
  secret: 'SESSION_SECRET',
  auth: {
    google: {
      clientID: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOGLE_CLIENT_SECRET',
      callbackURL: 'http://localhost:8080/auth/google/callback'
    },
    facebook: {
      clientID: 'FACEBOOK_CLIENT_ID',
      clientSecret: 'FACEBOOK_CLIENT_SECRET',
      callbackURL: 'http://localhost:8080/auth/facebook/callback'
    }
  }
};
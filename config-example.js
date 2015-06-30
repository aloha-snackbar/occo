module.exports = {
  secret: 'SESSION_SECRET',

  tls: {
    key: 'TLS_PRIVATE_KEY',
    cert: 'TLS_CERTIFICATE'
  },

  auth: {
    google: {
      clientID: 'GOOGLE_CLIENT_ID',
      clientSecret: 'GOOGLE_CLIENT_SECRET',
      callbackURL: 'https://localhost:8443/auth/google/callback'
    },
    facebook: {
      clientID: 'FACEBOOK_CLIENT_ID',
      clientSecret: 'FACEBOOK_CLIENT_SECRET',
      callbackURL: 'https://localhost:8443/auth/facebook/callback'
    }
  }
};
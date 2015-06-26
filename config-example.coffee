module.exports = 
  auth:
    google:
      clientID: '',
      clientSecret: '',
      callbackURL: 'http://localhost:8080/auth/google/callback'
    facebook:
      clientID: '',
      clientSecret: '',
      callbackURL: '',
      profileFields: ['id', 'photos', 'displayName', 'verified']
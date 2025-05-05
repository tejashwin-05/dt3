// In your passport.js file
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Make sure to select all fields including upiId
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
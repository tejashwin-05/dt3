export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    // Optionally, fetch the full user to ensure all fields are available
    User.findById(req.user._id)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => {
        console.error("Error fetching user:", err);
        res.status(500).json({ message: "Server error" });
      });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
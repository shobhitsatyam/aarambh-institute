exports.getSecureData = (req, res) => {
  // Access user data from req.user (set by authMiddleware)
  res.json({ message: `Secure data for user ${req.user.username}`, user: req.user });
};

// Middleware to be used in routes to check if user is authenticated

const authenticate = (req, res, next) => {
  if (global.currentUser) {
    req.user = global.currentUser;
    next();
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized request, please login.",
      status: 401,
    });
  }
};

const authorizedAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Access denied, admin only",
      status: 403,
    });
  }
};
export { authenticate, authorizedAdmin };

const db = require("../models");
const passport = require("../config/passport");

module.exports = (app) => {
  //login query
  app.get("/api/users", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  app.post("/api/users", (req, res) => {
    console.log("Hello");
    db.User.create(req.body)
      .then((dbUser) => res.json(dbUser))
      // TODO in catch also add sequelize validation see review-api :34
      .catch((error) => res.status(500).json({ error }));
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.status(200).json({});
  });
};

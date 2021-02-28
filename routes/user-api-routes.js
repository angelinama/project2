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

  app.get("/api/users/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      //TODO remove password from return.
      .then((dbUser) => res.json(dbUser))
      //add .catch
      .catch((error) => console.log({ error }));
  });

  app.post("/api/users", (req, res) => {
    console.log("Hello");
    db.User.create(req.body)
      .then((dbUser) => res.json(dbUser))
      .catch((error) => res.status(500).json({ error }));
  });

  app.delete("/api/users/:id", (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbUser) => res.json(dbUser));
  });
};

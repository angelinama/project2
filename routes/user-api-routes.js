const db = require("../models");

module.exports = (app) => {
  app.get("/api/users", (req, res) => {
    db.User.findAll({}).then((dbUser) => {
      res.json(dbUser);
    });
  });

  app.get("/api/users/:id", (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbUser) => res.json(dbUser))
      //add .catch
      .catch((error) => console.log({ error }));
  });

  app.post("/api/users", (req, res) => {
    console.log("Hello");
    db.User.create(req.body)
      .then((dbUser) => res.json(dbUser))
      //add .catch. when email not @ doesn't work.
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

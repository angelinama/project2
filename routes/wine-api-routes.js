const db = require("../models");

module.exports = (app) => {
  app.get("/api/wines", (req, res) => {
    db.Wine.findAll({}).then((dbWine) => {
      res.json(dbWine);
    });
  });

  app.get("/api/wines/:id", (req, res) => {
    db.Wine.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbWine) => res.json(dbWine));
  });

  app.post("/api/wines", (req, res) => {
    db.Wine.create(req.body).then((dbWine) => res.json(dbWine));
  });

  app.delete("/api/wines/:id", (req, res) => {
    db.Author.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbWine) => res.json(dbWine));
  });
};

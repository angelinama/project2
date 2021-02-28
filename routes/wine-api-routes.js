const db = require("../models");

module.exports = (app) => {
  app.get("/api/wines", (req, res) => {
    db.Wine.findAll({})
      .then((dbWine) => {
        res.json(dbWine);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

  app.get("/api/wines/:id", (req, res) => {
    db.Wine.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbWine) => res.json(dbWine))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

  app.post("/api/wines", (req, res) => {
    db.Wine.create(req.body)
      .then((dbWine) => res.json(dbWine))
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

  app.delete("/api/wines/:id", (req, res) => {
    db.Wine.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbWine) => res.json(dbWine))
      .catch((err) => {
        console.log(err);
        res.status(400).send("Bad request");
      });
  });
};

const db = require("../models");

module.exports = (app) => {
  app.get("/api/reviews", (req, res) => {
    db.Review.findAll({}).then((dbReveiw) => {
      res.json(dbReveiw);
    });
  });

  app.get("/api/reviews/:id", (req, res) => {
    db.Review.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbReveiw) => res.json(dbReveiw));
  });

  app.post("/api/reviews", (req, res) => {
    db.Review.create(req.body).then((dbReveiw) => res.json(dbReveiw));
  });

  app.delete("/api/reviews/:id", (req, res) => {
    db.Review.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbReveiw) => res.json(dbReveiw));
  });
};

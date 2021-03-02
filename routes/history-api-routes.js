const db = require("../models");

module.exports = (app) => {
  //get user's history
  app.get("/api/winehistory/:id", (req, res) => {
    if (req.user) {
      db.History.findAll({
        where: {
          user_id: req.params.id,
        },
      })
        .then((history) => {
          res.json(history);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });
  //get one wine history
  app.get("/api/winehistory/wine/:wineId", (req, res) => {
    if (req.user) {
      db.History.findOne({
        where: {
          user_id: req.user.id,
          wine_id: req.params.wineId,
        },
      })
        .then((history) => {
          res.json(history);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });

  app.post("/api/winehistory", (req, res) => {
    console.log(req.user.id);
    if (req.user) {
      console.log("====THIS IS A TEST======:26");
      req.body.user_id = req.user.id;
      db.History.create(req.body)
        .then((wineHistory) => res.json(wineHistory))
        .catch((err) => {
          if (err instanceof Sequelize.ValidationError) {
            let msg = "";
            for (const e of err.errors) {
              //TODO e.message currently is like: Review.wine_id cannot be null, will change it to sth like "you have to select a wine to create review"
              msg = msg + e.message + "\n";
            }
            res.status(422).send(msg);
          } else {
            res.status(500).send("Something went wrong");
          }
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });
  //delete one
  app.delete("/api/winehistory/:id", (req, res) => {
    console.log(req.params.id);
    if (req.user) {
      db.History.destroy({
        where: {
          wine_id: req.params.id,
          user_id: req.user.id,
        },
      })
        .then((historyEntry) => res.json(historyEntry))
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });
  app.put("/api/winehistory/:wineId", (req, res) => {
    if (req.user) {
      db.History.update(
        { favorite: req.body.favorite },
        {
          where: {
            wine_id: req.params.wineId,
            user_id: req.user.id,
          },
        }
      )
        .then((historyEntry) => res.json(historyEntry))
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });
};

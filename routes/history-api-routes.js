const db = require("../models");

module.exports = (app) => {
  //get user's history
  app.get("/api/history/:id", (req, res) => {
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
};

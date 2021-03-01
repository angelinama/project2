const db = require("../models");

module.exports = (app) => {
  //get user's bucktlist
  app.get("/api/bucketlist/:id", (req, res) => {
    if (req.user) {
      db.Bucketlist.findAll({
        where: {
          user_id: req.params.id,
        },
      })
        .then((bucketlist) => {
          res.json(bucketlist);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });
  //add one (post)
  app.post("/api/bucketlist", (req, res) => {
    console.log(req.user.id);
    if (req.user) {
      req.body.user_id = req.user.id;
      db.Bucketlist.create(req.body)
        .then((bucketlistEntry) => res.json(bucketlistEntry))
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
  app.delete("/api/bucketlist/:id", (req, res) => {
    if (req.user) {
      db.Bucketlist.destroy({
        where: {
          id: req.params.id,
        },
      })
        .then((bucketlistEntry) => res.json(bucketlistEntry))
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });
};

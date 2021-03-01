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

  //UPDATE
  app.put("/api/bucketlists/winehistory:id", (req, res) => {
    if (req.user) {
      // 1. get wine by its wine_id from bucket

      db.Bucketlist.update({
        where: {
          wine_id: req.params.id,
        },
      })
      //2. add to history
      //3. delete from bucketlist
      db.Bucketlist.destroy({
        where: {
          wine_id: req.params.id,
        },
        //4. redirect to history
        .then((bucketlistEntry) => res.json(bucketlistEntry))
        .catch((err) => {
          console.log(err);
          res.status(500).send("Something went wrong");
        });
    } else {
      res.status(401).json({ error: "Please log in" });
    }
  });

  //delete one
  app.delete("/api/bucketlists/:id", (req, res) => {
    if (req.user) {
      db.Bucketlist.destroy({
        where: {
          wine_id: req.params.id,
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

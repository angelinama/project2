const db = require("../models");

module.exports = (app) => {
  //get user's bucktlist
  app.get("/api/bucketlist/:id", (req, res) => {
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
  });
  //add one (post)
  app.post("/api/bucketlist", (req, res) => {
    db.Bucketlist.create(req.body)
      .then((bucketlistEntry) => res.json(bucketlistEntry))
      .catch((err) => {
        console.log(err);
        res.status(500).send("Something went wrong");
      });
  });

  //delete one
  app.delete("/api/bucketlist/:id", (req, res) => {
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
  });
};

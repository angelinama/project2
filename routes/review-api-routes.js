const db = require("../models");
const Sequelize = require("sequelize");
const passport = require("../config/passport");

module.exports = (app) => {
  app.get("/api/reviews", (req, res) => {
    db.Review.findAll({})
      .then((dbReveiw) => {
        res.json(dbReveiw);
      })
      .catch((err) => {
        console.log(err);
        //Not sure about what error code to send
        res.status(500).send("Something went wrong");
      });
  });

  app.get("/api/reviews/:id", (req, res) => {
    db.Review.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then((dbReveiw) => res.json(dbReveiw))
      .catch((err) => {
        console.log(err);
        res.status(500).send("Something went wrong");
      });
  });

  app.post("/api/reviews/wine/:wineId", (req, res) => {
    const reviewObj = {
      ...req.body,
      // user_id: req.user.id,
      user_id: 1,
      wine_id: req.params.wineId,
    };
    db.Review.create(reviewObj)
      .then((dbReveiw) => res.json(dbReveiw))
      .catch((err) => {
        //TODO should add users api and bucketlist
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
  });

  app.delete("/api/reviews/:id", (req, res) => {
    db.Review.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbReveiw) => res.json(dbReveiw))
      .catch((err) => {
        console.log(err);
        res.status(500).send("Something went wrong");
      });
  });
};

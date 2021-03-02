const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("../views/init.handlebars");
  });
  app.get("/login", (req, res) => {
    if (req.user) {
      res.redirect("/welcome");
    }
    res.render("../views/login.handlebars");
  });
  app.get("/signup", (req, res) => {
    if (req.user) {
      res.redirect("/welcome");
    }
    res.render("../views/signup.handlebars");
  });
  //render the welcome page in browser
  app.get("/welcome", isAuthenticated, (req, res) => {
    res.render("../views/welcome.handlebars");
  });
  //render the winestart page in browser
  app.get("/winestart", (req, res) => {
    res.render("../views/winestart.handlebars");
  });
  //render the wineentry page in browser
  app.get("/wineentry", (req, res) => {
    res.render("../views/wineentry.handlebars");
  });
  //render the bucketlist page in browser
  app.get("/bucketlist", (req, res) => {
    db.Bucketlist.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [db.Wine],
    }).then((data) => {
      console.log(
        data.map((entry) => {
          return entry.dataValues.Wine.dataValues;
        })
      );
      res.render("../views/bucketlist.handlebars", {
        wines: data.map((entry) => {
          return entry.dataValues.Wine.dataValues;
        }),
      });
    });
  });
  //render the wineentry page in browser
  app.get("/winehistory", (req, res) => {
    db.History.findAll({
      where: {
        user_id: req.user.id,
      },
      include: [db.Wine],
    })
      .then((data) => {
        console.log(
          data.map((entry) => {
            return {
              wine_name: entry.dataValues.Wine.dataValues.wine_name,
              wine_id: entry.dataValues.Wine.dataValues.id,
              history_id: entry.dataValues.id,
            };
          })
        );
        res.render("../views/winehistory.handlebars", {
          wines: data.map((entry) => {
            return {
              wine_name: entry.dataValues.Wine.dataValues.wine_name,
              wine_id: entry.dataValues.Wine.dataValues.id,
              history_id: entry.dataValues.id,
            };
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //render the winefavorites page in browser
  app.get("/favorites", (req, res) => {
    db.History.findAll({
      where: {
        user_id: req.user.id,
        favorite: true,
      },
      include: [db.Wine],
    })
      .then((data) => {
        console.log(
          data.map((entry) => {
            return entry.dataValues.Wine.dataValues;
          })
        );
        res.render("../views/winehistory.handlebars", {
          wines: data.map((entry) => {
            return entry.dataValues.Wine.dataValues;
          }),
          favorite: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });

  //render the winerate page in browser
  app.get("/winerate-:wineId", (req, res) => {
    res.render("../views/winerate.handlebars", { wineId: req.params.wineId });
  });

  app.get("/winesummary-:wineId", (req, res) => {
    res.render("../views/wineSummary.handlebars", {
      wineId: req.params.wineId,
    });
  });
};

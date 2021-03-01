const db = require("../models");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("../views/init.handlebars");
  });

  app.get("/login", (req, res) => {
    res.render("../views/login.handlebars");
  });

  app.get("/signup", (req, res) => {
    res.render("../views/signup.handlebars");
  });
  //render the welcome page in browser
  app.get("/welcome", (req, res) => {
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
    res.render("../views/winehistory.handlebars");
  });
  //render the winerate page in browser
  app.get("/winerate-:wineId", (req, res) => {
    res.render("../views/winerate.handlebars", { wineId: req.params.wineId });
  });
};

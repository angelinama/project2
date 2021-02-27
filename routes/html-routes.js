module.exports = (app) => {
  //render the welcome page in browser
  app.get("/welcome", (req, res) => {
    res.render("../views/welcome.handlebars");
  });
  //render the winestart page in browser
  app.get("/winestart", (req, res) => {
    res.render("../views/winestart.handlebars");
  });
};

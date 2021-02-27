module.exports = (app) => {
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
  //render the winerate page in browser
  app.get("/winerate", (req, res) => {
    res.render("../views/winerate.handlebars");
  });
};

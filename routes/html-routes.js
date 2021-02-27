module.exports = (app) => {
  //render the welcome page in browser
  app.get("/", (req, res) => {
    res.render("../views/init.handlebars");
  });
  //render the login page in browser
  app.get("/login", (req, res) => {
    res.render("../views/login.handlebars");
  });
  //render the signup page in browser
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
  //render the winerate page in browser
  app.get("/wineentry", (req, res) => {
    res.render("../views/wineentry.handlebars");
  });
};

//render the page in browser
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
};

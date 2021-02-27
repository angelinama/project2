//render the page in browser
module.exports = (app) => {
  app.get("/login", (req, res) => {
    res.render("../views/login.handlebars");
  });
};

//render the welcome page in browser
module.exports = (app) => {
  app.get("/welcome", (req, res) => {
    res.render("../views/welcome.handlebars");
  });
};

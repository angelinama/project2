//render the page in browser
module.exports = (app) => {
  app.get("/signup", (req, res) => {
    res.render("../views/signup.handlebars");
  });
};

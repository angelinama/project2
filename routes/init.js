//render the page in browser
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.render("../views/init.handlebars");
  });
};

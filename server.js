const express = require("express");
const db = require("./models");

//import routes --Carolina
const initRoute = require("./routes/init.js");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const wineRouter = require("./routes/wine-api-routes.js");
const userRouter = require("./routes/user-api-routes.js");
const reviewRouter = require("./routes/review-api-routes.js");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars. --Carolina
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
initRoute(app);
loginRoute(app);
signupRoute(app);
wineRouter(app);
userRouter(app);
reviewRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

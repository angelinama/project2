require("dotenv").config();
const express = require("express");
const db = require("./models");
const session = require("express-session");
const passport = require("./config/passport");

//import routes
const htmlRoutes = require("./routes/html-routes.js");
const wineRouter = require("./routes/wine-api-routes.js");
const userRouter = require("./routes/user-api-routes.js");
const reviewRouter = require("./routes/review-api-routes.js");
const bucketlistRouter = require("./routes/bucketlist-api-routes.js");
const historyRouter = require("./routes/history-api-routes.js");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Static directory
app.use(express.static("public"));

// Set Handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
wineRouter(app);
userRouter(app);
reviewRouter(app);
htmlRoutes(app);
bucketlistRouter(app);
historyRouter(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
});

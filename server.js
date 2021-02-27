const express = require("express");

//import routes --Carolina
const initRoute = require("./routes/init.js");
const loginRoute = require("./routes/login.js");
const signupRoute = require("./routes/signup.js");
const htmlRoutes = require("./routes/html-routes.js");

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
htmlRoutes(app);

// // Syncing our sequelize models and then starting our Express app
// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
// });

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

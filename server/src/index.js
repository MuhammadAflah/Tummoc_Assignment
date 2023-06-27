const express = require("express");
const cors = require("cors");
const { FRONTEND_URL } = require("./utils/Constants.js");
const app = express();
app.use(express.json()); // to parse the body of the request

// **********************************

const connect = require("./configs/db.js");

const session = require("express-session");
const MongoStore = require("connect-mongo"); //using for session store
const mongoose = require("mongoose");
require("dotenv").config();

(async () => {
  try {
    await connect(); // Establish the database connection
    console.log("database connected succesfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
})();

// session store

const store = MongoStore.create({
  mongoUrl: process.env.MONGO_DB_CONNECTION_URL,
  mongooseConnection: mongoose.connection,
  collectionName: "sessions",
  autoRemove: "interval",
  autoRemoveInterval: 2, // Remove expired sessions every 10 minutes
});
app.use(
  session({
    secret: "tummoc",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }, // 2 minutes expiration
    store,
  })
);

// **********************************

const { register, login } = require("./controllers/auth.controller");
const protected = require("./controllers/protected.controller");
const userController = require("./controllers/user.controller");

const passport = require("./configs/passport");
const { expireToken } = require("./middlewares/auth.middleware");

// const cookieParser = require("cookie-parser");

// app.use(cookieParser());

var corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true, // Enable sending cookies across origins
};
// app.use(cors());

app.use(cors(corsOptions));
app.options("*", cors()); // Enable preflight requests for all routes

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function ({ user, token }, done) {
  done(null, { user, token });
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

app.post("/register", register);
app.post("/login", login);

app.get("/", (req, res) => {
  return res
    .status(200)
    .send("Hi my dear friend, i am working fine don't worry");
});

/**
 * jwt auth
 */
app.use(
  "/users",
  [passport.authenticate("jwt", { session: false }), expireToken],
  userController
);

app.get(
  "/protected",
  [passport.authenticate("jwt", { session: false }), expireToken],
  (req, res) => {
    return res
      .status(200)
      .send("Hi my dear friend, i am working fine don't worry");
  }
);

/**
 * Google OAuth
 */

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"], //getting email and profile
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/google/failure",
  }),
  function (req, res) {
    res.cookie("token", req.user.token);
    return res.redirect(`${FRONTEND_URL}dashboard`);
    // return res.status(201).json({ user: req.user.user, token: req.user.token });
  }
);

app.get("/auth/google/failure", function (req, res) {
  return res.send("Something went wrong");
});

app.get("/auth/google/login", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      token: req.user.token,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

app.get("/auth/google/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).json({ error: "Failed to destroy session" });
    }

    // Clear any relevant session data or user information
    return res.redirect(`${FRONTEND_URL}dashboard`);
  });
});

// *****************************
const port = 8080;
app.listen(port, () => {
  console.log("Server listening on port 8080");
});

module.exports = app;

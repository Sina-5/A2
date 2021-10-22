/* fileName: app.ts
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */
import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import mongoose, { mongo } from "mongoose";
// MODULES:
// for authentication
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";

//for cors
import cors from "cors";

// authentication logic
let localStrategy = passportLocal.Strategy; // alias
import User from "../Models/user";

// for auth messaging and error handling
import flash from "connect-flash";

// attach router files
import indexRouter from "../Routes/index";
import contactingRounter from "../Routes/contacting";

// Express Configuration
const app = express();
export default app;

// DB Configuration
import * as DBConfig from "./db";
mongoose.connect(DBConfig.RemoteURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection; // alias for the mongoose connection
db.on("error", function () {
  console.error("connection error");
});

db.once("open", function () {
  console.log(`Connected to MongoDB at: ${DBConfig.HostName}`);
});

// view engine setup
app.set("views", path.join(__dirname, "../Views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../Client")));
app.use(express.static(path.join(__dirname, "../../node_modules")));

// add support for cors object
app.use(cors());

// setup express session
app.use(
  session({
    secret: DBConfig.Secret,
    saveUninitialized: false,
    resave: false,
  })
);

// initialize connect-flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// implement an Auth Strategy - "local" - username / password
passport.use(User.createStrategy());

// serialize and deserialize the user data
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// create routing through event handling
app.use("/", indexRouter);
app.use("/contacting-list", contactingRounter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: createError.HttpError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Strategy: JWTStrategy, ExtractJwt } = require("passport-jwt");
const bcrypt = require("bcrypt");
const { jwtSecret, db } = require("./conf");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      db.query(
        "SELECT email, password, nickname FROM user WHERE email=?",
        [email, password],
        (err, usersRows) => {
          if (!usersRows)
            return done(null, false, { message: "User not found!" });
          const user = usersRows[0];
          if (err) return done(err);
          if (!user) return done(null, false, { message: "User not found!" });
          bcrypt.compare(password, user.password, (errBcrypt, result) => {
            if (errBcrypt) return done(errBcrypt);
            console.log("DEBUG (again)");
            console.log(result);
            if (!result)
              return done(null, false, { message: "Incorrect password!" });
            return done(null, user);
          });
        }
      );
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtSecret
    },
    (jwtPayload, done) => {
      const user = jwtPayload;
      return done(null, user);
    }
  )
);

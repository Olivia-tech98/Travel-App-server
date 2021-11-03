const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");

const router = Router();


router.post("/signup", function (req, res) {
  User.create({
   firstName: req.body.user.firstName,
   lastName: req.body.user.lastName,
   email: req.body.user.email,
   userName: req.body.user.userName,
   passwordhash: bcrypt.hashSync(req.body.user.passwordhash, 13),
  })
  .then(function createSuccess(user) {
    let token = jwt.sign({id:user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: 60* 60 * 24,}
    );
    res.json({
      user:user,
      message: "User successfully created!",
      sessionToken: token,
    })
  })
  .catch((err)=> res.status(500).json({eror:err}))
});

router.post("/login", function (req, res) {
  User.findOne({
    where: {
      email: req.body.user.email,
    },
  })
    .then(function loginSuccess(user) {
      if (user) {
        bcrypt.compare(req.body.user.passwordhash, user.passwordhash, function (
          err,
          matches
        ) {
          if (matches) {
            let token = jwt.sign(
              { id: user.id, email: user.email },
              process.env.JWT_SECRET,
              {
                expiresIn: 60 * 60 * 24,
              }
            );
            res.status(200).json({
              user: user,
              message: "User Successfully Logged in!",
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: "Login Failed" });
          }
        });
      } else {
        res.status(500).json({ error: "User does not exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;

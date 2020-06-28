const { User } = require('../../db/models/userModel');

// let authenticate = (req, res, next) => {
//   let token = req.cookies.auth;

//   User.findByToken(token, (err, user) => {
//     if (err) return res.status(400).json({
//       message: `Error ${err} occured while verifying token.`
//     });
//     if (!user) return res.status(401).send('Wrong email or password');

//     req.user = user;
//     req.token = token;
//     next();
//   });
// };

module.exports = (req, res, next) => {
  let token = req.cookies.auth;

  User.findByToken(token, (err, user) => {
    if (err) return res.status(400).json({
      message: `Error ${err} occured while verifying token.`
    });
    if (!user) return res.status(401).send('Wrong email or password');

    req.user = user;
    req.token = token;
    next();
  });
};
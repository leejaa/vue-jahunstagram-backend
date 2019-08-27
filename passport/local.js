const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const crypto = require('crypto');
const db = require('../models');

module.exports = () => {

  console.log(`local enter...`);

  passport.use(new LocalStrategy({
    usernameField: 'userId',
    passwordField: 'password',
  }, async (userId, password, done) => {

    console.log(`userId : ${userId}`);
    console.log(`password : ${password}`);

    try {
      const user = await db.User.findOne({ where: { userId } });
      if (!user) {
        return done(null, false, { reason: '존재하지 않는 사용자입니다!' });
      }

      console.log(`user : ${JSON.stringify(user)}`);

      const hashedPassword = crypto.createHash('sha512').update(password).digest('base64');

      console.log(`hashedPassword : ${hashedPassword}`);

      const result = await db.User.findOne({ where: { userId, password: hashedPassword } });

      console.log(`result : ${JSON.stringify(result)}`);

      if (result) {
        return done(null, user);
      }
      return done(null, false, { reason: '비밀번호가 틀립니다.' });
    } catch (e) {
      console.error(e);
      return done(e);
    }
  }));
};

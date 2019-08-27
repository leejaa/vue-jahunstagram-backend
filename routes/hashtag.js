const express = require('express');
const db = require('../models');

const router = express.Router();

// router.get('/:tag', async (req, res, next) => {
//   try {
//     let where = {};
//     if (parseInt(req.query.lastId, 10)) {
//       where = {
//         id: {
//           [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
//         },
//       };
//     }
//     const posts = await db.Post.findAll({
//       where,
//       include: [{
//         model: db.Hashtag,
//         where: { name: decodeURIComponent(req.params.tag) },
//       }, {
//         model: db.User,
//         attributes: ['id', 'nickname'],
//       }, {
//         model: db.Image,
//       }, {
//         model: db.User,
//         through: 'Like',
//         as: 'Likers',
//         attributes: ['id'],
//       }, {
//         model: db.Post,
//         as: 'Retweet',
//         include: [{
//           model: db.User,
//           attributes: ['id', 'nickname'],
//         }, {
//           model: db.Image,
//         }],
//       }],
//       order: [['createdAt', 'DESC']],
//       limit: parseInt(req.query.limit, 10),
//     });
//     res.json(posts);
//   } catch (e) {
//     console.error(e);
//     next(e);
//   }
// });




router.get('/', async (req, res, next) => {

  console.log(`hashtag enter...`);

  console.log(req.query);

  try {
    let where = {};

    if(req.query.tag){
      where = {
        title: {
          [db.Sequelize.Op.like]: `%${req.query.tag}%`,
        },
        content: {
          [db.Sequelize.Op.like]: `%${req.query.tag}%`,
        }
      }
    }

    const posts = await db.Post.findAll({
      where,
      include: [{
        model: db.Image,
      }],
      order: [['createdAt', 'DESC']],
    });

    console.log(`hashtag end....`);

    res.json(posts);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;

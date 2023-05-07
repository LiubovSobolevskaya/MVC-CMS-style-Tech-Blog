const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'title', 'post_text', 'date_created'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(postData => {
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


router.get('/new', withAuth, (req, res) => {
  res.render('addpost');
});

module.exports = router;
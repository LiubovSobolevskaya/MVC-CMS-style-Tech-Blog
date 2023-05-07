const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: ['id', 'title', 'post_text'],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id'],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
  .then(postData => {
    //serialize the data before passing to the template
    const posts = postData.map(post => post.get({ plain: true }));
    res.render('dashboard', { posts, logged_in: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});




module.exports = router;
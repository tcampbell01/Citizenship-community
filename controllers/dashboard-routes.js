const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Topic } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
 
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
   
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Topic,
        attributes: ['id', 'topic_title']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
  // in my projects this is an example where this is Post.findByPk(req.params.id, 
  // not sure if this also works but just pointing out a potential change
  // (without the "where" part)
  // it might have just been one of those refactoring steps somewhere along
    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "post_content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Topic,
          attributes: ["id", "topic_title"],
        },
      ],
    })
      .then((dbPostData) => {
        if (!dbPostData) {
          res.status(404).json({ message: "No post found with this id" });
          return;
        }
  
        const post = dbPostData.get({ plain: true });
        res.render("edit-post", { post, loggedIn: true });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;

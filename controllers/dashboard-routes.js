const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Topic } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
 
  Post.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
    ],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["first_name", "last_name"]
        }
      },
      {
        model: User,
        attributes: ["first_name", "last_name"]
      },
      {
        model: Topic,
        attributes: ["id", "topic_title"]
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true, username: req.session.username, zipcode: req.session.zipcode });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
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
            attributes: ["first_name", "last_name"],
          },
        },
        {
          model: User,
          attributes: ["first_name", "last_name"],
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
        res.render("edit-post", { post, loggedIn: true, username: req.session.username, zipcode: req.session.zipcode });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;

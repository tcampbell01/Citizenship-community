const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Topic } = require('../models');
const withAuth = require('../utils/auth');


router.get('/', (req, res) => {
  Topic.findAll({
   
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_content', 'user_id']
      },
      
    ]
  })
    .then(dbTopicData => res.json(dbTopicData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at'
   
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: Topic,
        attributes: ['id', 'title']
      },
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'post_content',
      'created_at',
     
    ],
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
        attributes: ['id', 'title']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      

    const post= dbPostData.get({plain:true});
    res.render('edit-post', {post, loggedIn:true});
  })
})
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
   
   
router.get('/new', (req,res) => {
  res.render('new-post');
});

module.exports = router;

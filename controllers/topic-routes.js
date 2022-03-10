const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Topic, Comment, TopicPost} = require('../models');
const withAuth = require('../utils/auth');

// get all users
router.get('/', (req, res) => {
  Topic.findAll({
   
    include: [
      {
        model: Post
      },
      
    ]
  })
    .then(dbTopicData => res.json(dbTopicData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
  Topic.findOne({
    where: {
      id: req.params.id
    },
    include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_content', 'user_id', 'created_at'],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
              include: {
                model: User,
                attributes: ['first_name', 'last_name']
              }
            },
            {
              model: User,
              attributes: ['first_name', 'last_name']
            },
            {
              model: Topic,
              attributes: ['id', 'topic_title']
            }
          ]
        },
        
    ]
  })

  // We want to change this so that if you click on a topic with no comments, you are instructed to create one. 
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No topic with this ID found' });
        return;
      }
      const posts = dbTopicData.posts.map(post => post.get({ plain: true }));
      // const posts = dbTopicData.get({ plain: true });
      // const topics = dbTopicData.get({ plain: true });
      res.render("topic", { posts, loggedIn: req.session.loggedIn, username: req.session.username, zipcode: req.session.zipcode}); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Topic.create({
    title: req.body.title
   
  })
    .then(dbTopicData => res.json(dbTopicData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Topic.update(
    {
      title: req.body.title
      
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No topic found with this id' });
        return;
      }
      res.json(dbTopicData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Topic.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No topic found with this id' });
        return;
      }
      res.json(dbTopicData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
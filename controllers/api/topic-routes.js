const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, Topic, TopicPost} = require('../../models');
const withAuth = require('../../utils/auth');

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

router.get('/:id', (req, res) => {
  Topic.findOne({
    where: {
      id: req.params.id
    },
    include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_content', 'user_id']
        },
        
    ]
  })
    .then(dbTopicData => {
      if (!dbTopicData) {
        res.status(404).json({ message: 'No topic with this ID found' });
        return;
      }
      // const topics = dbTopicData.map(topic => topic.get({ plain: true }));
      const topics = dbTopicData.get({plain: true});
      console.log(topics);
      res.render("topic", { topics });
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

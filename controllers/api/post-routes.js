const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment, Topic, TopicPost } = require('../../models');
const withAuth = require('../../utils/auth');

// get all users
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
        attributes: ['first_name', 'last_name']
      },
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['first_name', 'last_name']
        }
      },
      {
        model: Topic,
        attributes: ['id', 'topic_title'],
       
        }

      
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', withAuth, (req, res) => {
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
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // res.json(dbPostData);
      // const posts = dbPostData.posts.map(post => post.get({ plain: true }));
      const posts = dbPostData.get({ plain: true });
      // const topics = dbPostData.get({ plain: true });
      res.render("post", { posts, loggedIn: req.session.loggedIn, username: req.session.username, zipcode: req.session.zipcode }); 
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  
  Post.create({
    title: req.body.title,
    post_content: req.body.post_content,
    user_id: req.session.user_id,
   
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/topic', withAuth, (req, res) => {

  Post.findAll({
    limit: 1,
    order: [[ 'createdAt', 'DESC' ]]
  }).then(entries => {
    var postID = entries[0].id;

    TopicPost.create({
      post_id: JSON.stringify(postID),
      topic_id: req.body.topic_id
    })
    .then(dbTopicPostData => res.json(dbTopicPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  })
})


// router.post('/', withAuth, (req, res) => {
  
//   TopicPost.create({
//     post_id: req.
//     topic_id: 
   
//   })
//     .then(dbPostData => res.json(dbPostData))
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

router.put('/:id', withAuth, (req, res) => {
  Post.update(
    {
      title: req.body.title,
      post_content: req.body.post_content
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
 
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;

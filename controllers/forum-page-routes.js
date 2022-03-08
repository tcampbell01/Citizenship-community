const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Topic } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  // Topic.findAll({
  //   include: [
  //     {
  //       model: Post,
  //       attributes: ["id", "title", "post_content", "user_id"],
  //     },
  //   ],
  // })
  //   .then((dbTopicData) => res.json(dbTopicData))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(500).json(err);
  //   });
  res.render('forum-page');
});


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
      res.render('forum', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  Topic.findAll({
   
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_content', 'user_id']
      },
      
    ]
  })
  .then(dbTopicData => {
    const topic = dbTopicData.map(topic => topic.get({ plain: true }));

     // this should be render("single-post",)
      // the logged in: true should be loggedIn: req.session.loggedIn eventually,
      // not sure if you were just doing this temporarily
      
    res.render('forum', { topic, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// router.get("/edit/:id", withAuth, (req, res) => {
//     Post.findOne({
//       where: {
//         id: req.params.id,
//       },
//       attributes: ["id", "title", "post_content", "created_at"],
//       include: [
//         {
//           model: Comment,
//           attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
//           include: {
//             model: User,
//             attributes: ["username"],
//           },
//         },
//         {
//           model: User,
//           attributes: ["username"],
//         },
//         {
//           model: Topic,
//           attributes: ["id", "topic_title"],
//         },
//       ],
//     })
//       .then((dbPostData) => {
//         if (!dbPostData) {
//           res.status(404).json({ message: "No post found with this id" });
//           return;
//         }
  
//         const post = dbPostData.get({ plain: true });
//         res.render("edit-post", { post, loggedIn: true });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });





module.exports = router;

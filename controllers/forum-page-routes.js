const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, User, Comment, Topic } = require("../models");
const withAuth = require("../utils/auth");

// so heres the thing we want this to actually render the forum-page file,
// which is currently the "/" of this forum routes, meaning its "/forum" url.
// as specified by the index.js file in this directory. and we need to send
// the topics as an object also. we need to redirect the user back to the sign in page 
// if they aren't logged in, and here's why that may not work - 
// we have "/" as homepage and "/forum" as forum-page routes. but here
// if we redirect from within this file to /login i think it might do /forum/login but we need
// it to go directly to "/login". solution might be to combine the forum-page and home-page 
// routes files and then just specify different routes from within the same file
router.get("/", (req, res) => {
  // if (!req.session.loggedIn) {
  //   res.redirect('/login');
  //   return;
  // }
  Topic.findAll({
    include: [
      {
        model: Post,
        attributes: ["id", "title", "post_content", "user_id"],
      },
    ],
  })
    .then((dbTopicData) => res.json(dbTopicData))
    // .then(dbTopicData => {
    //   const topics = dbPostData.map(topic => topic.get({ plain: true }));
    //   res.render('/', {
    //       topics,
    //       loggedIn: req.session.loggedIn
    //   });
    // })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// since we dont need a get/find all indiscriminately for all posts i believe the way to do this is make seperate get/findall
// for each specific topic in different routes (topic-1, topic-2, etc) since forum page should just render
// a instructional page in the center frame where it tells you how to use the dashboard
// to create posts, and to select a topic on the left to view them. see bottom of page for example.
// also right below this block is what i think we need instead
router.get("/", (req, res) => {
  Post.findAll({
    attributes: ["id", "title", "post_content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: Topic,
        attributes: ["id", "topic_title"],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/', (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
      return;
  }
  res.render('forum-page');
});

// i think what we were thinking here was ("/post/:id", instead.
// edit/:id should only be a dashboard route, see that file for suggestion
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

      // this should be render("single-post",)
      // the logged in: true should be loggedIn: req.session.loggedIn eventually,
      // not sure if you were just doing this temporarily
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", { post, loggedIn: true });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// we dont need this because the create post form will just be on the dashboard page 
router.get("/new", (req, res) => {
  res.render("new-post");
});

module.exports = router;

// suggestion/request for forum-page routes linking to topic-1, topic-2 etc handlebars front end
// router.get('/:topic_id', (req, res) => {
//       Post.findAll({
//           where: {
//             topic_id: req.params.topic_id
//             // also i think we need the topic_id attribute uncommented for post model to do this.
//             // we also reference it in the posts routes create. we might differ in opinion i personally think we need it, need to test still
//           },
//           attributes: [
//               'id',
//               'title',
//               'post_content',
//               'created_at',
//               'topic_id'
//           ],
//           include: [
//               {
//                   model: Comment,
//                   attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
//                   include: {
//                       model: User,
//                       attributes: ['username']
//                   }
//               },
//               {
//                   model: User,
//                   attributes: ['username']
//               },
//               {
//                 model: Topic,
//                 attributes: ["id", "topic_title"],
//               },
//           ]
//       })
//       .then(dbPostData => {
//           const posts = dbPostData.map(post => post.get({ plain: true }));
//           // how to pass a single post object into the homepage template
//           // res.render('homepage', dbPostData[0].get({ plain: true }));
//           res.render('topic-1', {
//               posts,
//               loggedIn: req.session.loggedIn
//           });
//       })
//       .catch(err => {
//           console.log(err);
//           res.status(500).json(err);
//       });
// });
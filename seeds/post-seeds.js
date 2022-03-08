const { Post } = require('../models');

const postData = [
  {
    title: "Links to US Citizenship test- 100 questions(2008", 
    post_content: "This is where I found the links to USCIS questions: https://www.uscis.gov/citizenship/civics-practice-test-2008", 
    user_id: 1,
    // topic_id: 1
  },
  {
    title: "Here's a very cool Citizenship quiz", 
    post_content: "https://www.britannica.com/quiz/can-you-answer-these-questions-from-the-united-states-citizenship-test", 
    user_id: 2,
    // topic_id: 2
  },
  {
    title: "The Youtube Channel for USCIS", 
    post_content: "Official YouTube channel of U.S. Citizenship and Immigration Services (USCIS): https://www.youtube.com/user/uscis", 
    user_id: 3,
    // topic_id: 3
  },
  {
    title: "Profiles on Naturalized Citizens", 
    post_content: "See characteristics of immigrants who naturalized during the fiscal year. More at: https://www.dhs.gov/profiles-naturalized-citizens", 
    user_id: 4,
    // topic_id: 4
  },
  {
    title: "How U.S. Visa Delays Are Taking a Costly Toll on Frustrated Workers", 
    post_content: "What does delayed work permits mean? More at: https://www.bloomberg.com/news/features/2022-03-04/how-uscis-visa-processing-time-delays-are-hurting-immigrant-workers-and-jobs", 
    user_id: 5,
    // topic_id: 5
  },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;

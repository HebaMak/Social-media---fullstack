const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

//create a post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});
//update a post
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('The post has been updated');
    } else {
      res.status(403).json('You can update only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json('your post has been deleted');
    } else {
      res.status(403).json('you can delete only your post');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like/dislike a post
router.put('/:id/like', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    if (post) {
      if (!post.likes.includes(userId)) {
        await post.updateOne({
          $push: {
            likes: userId,
          },
        });
        res.status(200).json('You like this post');
      } else {
        await post.updateOne({ $pull: { likes: userId } });
        res.status(200).json('you disliked this post');
      }
    } else {
      res.status(403).json('post not found');
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//get post
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (err) {
    // res.status(500).json(err);
    res.status(403).json('post not found');
  }
});

//get timeline posts
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const followingsPosts = await Promise.all(
      currentUser.followings.map((followingId) => {
        return Post.find({ userId: followingId });
      })
    );

    res.status(200).json(userPosts.concat(...followingsPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get users all posts
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    const posts = await Post.find({ userId: user._id });      
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;

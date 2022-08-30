const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req, res) => {
  const { userId, password, isAdmin } = req.body;
  const { id } = req.params;
  if (userId === id || isAdmin) {
    if (password) {
      try {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).json('account has been updated');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json('You can update only your account');
  }
});

//delete user
router.delete('/:id', async (req, res) => {
  const { userId, isAdmin } = req.body;
  const { id } = req.params;
  if (userId === id || isAdmin) {
    try {
      await User.findByIdAndDelete(id);
      res.status(200).json('User has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    return res.status(403).json('you can  delete only your account');
  }
});

//get a user
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId ? await User.findById(userId) : await User.findOne({username: username});
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get friends
router.get("/friends/:userId", async(req,res)=> {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map(friendId => {
        return User.findById(friendId)
      })
    )
    let friendList = [];
    friends.map(friend => {
      const {_id, username, profilePicture} = friend
      friendList.push({_id, username, profilePicture})
    })
    res.status(200).json(friendList)
  }
  catch(err){res.status(500).json(err)}
})

//follow a user
router.put('/:id/follow', async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const userToFollow = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (!userToFollow.followers.includes(userId)) {
        await userToFollow.updateOne({ $push: { followers: userId } });
        await currentUser.updateOne({ $push: { followings: id } });
        // res.status(200).json('user has been followed');
        res.status(200).json(`${currentUser} followed ${userToFollow}`);
      } else {
        // res.status(403).json('you already follow this user');
        res
          .status(403)
          .json(
            `you ${currentUser.username} already follow ${userToFollow.username}`
          );
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant follow yourself');
  }
});

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
  const { userId } = req.body;
  const { id } = req.params;
  if (userId !== id) {
    try {
      const userToUnfollow = await User.findById(id);
      const currentUser = await User.findById(userId);
      if (userToUnfollow.followers.includes(userId)) {
        await userToUnfollow.updateOne({ $pull: { followers: userId } });
        await currentUser.updateOne({ $pull: { followings: id } });
        res.status(200).json('you unfollowed this user');
      } else {
        res.status(403).json('you already dont follow this user');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json('you cant unfollow yourself');
  }
});

module.exports = router;

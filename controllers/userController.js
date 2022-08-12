const { response } = require('express');
const {User} = require('../models');

// get all users
const getUser = (req, res) => {
    User.find({}).then(user => res.json(user));
};

//get a single user
const getSingleUser = () => {
    User.findOne({_id: req.params.userId})
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then(user => res.json(user));
};

//create a User
const createUser = (req,res) => {
userCreate(req.body).then(user => res.json(user));
};

//update a User
const updateUser = () => {
    User.findOneAndUpdate(
        {_id:req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
)
        .then((user) => {res.json(user);})
};

//delete a User and thoughts
const deleteUser = () => {
    User.findOneAndDelete({ _id: req.params.userId })
    .then((user) =>
    !user
        ? res.status(404).json({ message: "No User find with this ID!" })
        : Thought.deleteMany({ _id: { $in: user.thoughts } })
    )
    .then(() => res.json({ message: "User and Thought deleted!" }))
    .catch((err) => res.status(500).json(err));
};

//add a Friend
const addFriend = () => {
    User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new: true},
    )
    .then((user) => {response.json(user);});
};

//delete a Friend
const deleteFriend = () => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {new: true}
    )
    .then((user) => {response.json(user);});
};

module.exports = {getUser, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend};
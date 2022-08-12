const { response } = require('express');
const {User, Thought} = require('../models');

// get all users
const getUser = (req, res) => {
    User.find({}).then(user => res.json(user))
    .catch((err) => res.status(500).json(err));
};

//get a single user
const getSingleUser = (req, res) => {
    User.findOne({_id: req.params.userId})
    .populate("thoughts")
    .populate("friends")
    .select("-__v")
    .then(user => 
        !user
            ? res.status(404).json({message:'No User found with that ID!'})
            :res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

//create a User
const createUser = (req,res) => {
    User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) =>{
            return res.status(500).json(err);
        });
};

//update a User
const updateUser = (req,res) => {
    User.findOneAndUpdate(
        {_id:req.params.userId},
        {$set: req.body},
        {runValidators: true, new: true}
    )
        .then((user) => 
            !user
                ? res.status(404).json({message: 'No User found with that ID!'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
};

//delete a User and thoughts
const deleteUser = (req, res) => {
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
const addFriend = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.userId}, 
        {$addToSet: {friends: req.params.friendId}},
        {runValidators: true, new: true},
    )
    .then((user) => 
        !user
            ? res.status(404).json({message: 'No User found with that ID!'})
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

//delete a Friend
const deleteFriend = (req, res) => {
    User.findOneAndUpdate(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}},
        {new: true}
    )
    .then((user) => 
        !user
            ? res.status(404).json({message: "No User found with that ID!"})
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = {getUser, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend};
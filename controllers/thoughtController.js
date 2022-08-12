const { User, Thought } = require('../models');

//Get all thoughts
const getThought = (req,res) => {
    Thought.findOne({})
    .then((thought) => res.json(thought))
    .catch((err) => res.status(500).json(err));
};

//Get a single thought
const getSingleThought = (req, res) => {
    Thought.findOne({_id: req.params.thoughtId})
    .select("__v")
    .then((thought) => 
        !thought
            ? res.status(404).json ({message: "No Thought found with that ID"})
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err))
};

//Create a thought
const createThought = (req, res) => {
    Thought.create(req.body)
    .then(({_id}) => {
        return User.findOneAndUpdate(
            {_id: req.body.userId},
            {$push: {thoughts: _id}},
            {new: true},
        );
    })
    .then((thought) =>
        !thought
            ? res.status(404)({message: 'User not found with that ID'})
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

//Update a thought
const updateThought = (req, res) => {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$set:req.body},
        {runValidators: true, new: true}
    )
    .then((user) => 
        !user
            ? res.status(404).json({message: 'No thought not found with this ID'})
            : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
};

//Delete a thought
const deleteThought = () => {
    Thought.findOneAndDelete({_id: req.params.thoughtId})
    .then((thought) =>
        !thought
            ? res.status(404).json({message: 'No Thought found with that ID'})
            : User.findOneAndUpdate(
                {thoughts: req.params.thoughtId},
                {$pull: {thoughts: req.params.thoughtId}},
                {new: true}
            )
    )
    .then((user) =>
        !user
            ? res.status(404).json({message: 'Thought deleted, but no user found'})
            : res.json({message: "Thought successfully deleted"})
    )
    .catch((err) => res.status(500).json(err));
};

//Create a Reaction
const createReaction = (req, res) => {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: {reactions: req.body}},
        {runValidators: true, new: true}
    )
    .then((thought) =>
        !thought
            ? res.status(404).json({message: "Reaction not found with ID"})
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

const deleteReaction = (req, res) => {
    Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$pull: {reactions: {reactionId: req.params.reactionId}}},
        {runValidators: true, new: true}
    )
    .then((thought) =>
        !thought
            ? res.status(404).json({message: "No thought found with that ID"})
            : res.json(thought)
    )
    .catch((err) => res.status(500).json(err));
};

module.exports = {getThought, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction};


const { Schema, model } = require('mongoose');

const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: [validateEmail, "Please fill with a valid email address"],
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
                'Please fill a valid email address'
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            },
        ],
        friends: [
            {
                // self reference
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// virtual to count friends
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});
// create the User model using the UserSchema
const User = model('User', userSchema);

module.exports = User;
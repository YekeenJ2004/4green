import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    points : {
        type: Number, 
        required: true,
    },
    friends: {
        type:[String],
    },
    groups: {
        type:[String],
    },
    likes : {
        type:[String],
    }
});

const ChallengeSchema = new mongoose.Schema({
    challenge: String,
    date: Date,

});

const ResponseSchema = new mongoose.Schema({
    likes: Number,
    responsetime: Number,
    username: String,

});

export const User = mongoose.model('User', UserSchema);
export const Challenges = mongoose.model('Challenges', ChallengeSchema);
export const Response = mongoose.model('Response', ResponseSchema);

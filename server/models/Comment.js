const { Schema, model, Types } = require('mongoose');

//reply to a comment schema
const ReplySchema = new Schema({
    replyId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    replyBody: {
        type: String,
        max: 500,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

//comment schema
const commentSchema = new Schema({
    commentBody: {
        type: String,
        max: 500,
        required: true,
    },
    username: {
        type: String,
        required: true
    }
})

//declare the comment model
const Comment = model('Comment', commentSchema);

//export the thought model
module.exports = Comment;
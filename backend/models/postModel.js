import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  },
  {
    timestamps: true,
  }
);

const likeSchema = mongoose.Schema({
  name: { type: String, required: true },
  like: { type: Number, required: true },
});

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
    likes: [likeSchema],
    numComments: {
      type: Number,
      required: true,
      default: 0,
    },
    numLikes: {
      type: Number,
      required: true,
      default: 0,
    },
    numViews: {
      type: Number,
      required: true,
      default: 1,
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;

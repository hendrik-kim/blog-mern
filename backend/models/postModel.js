import mongoose from "mongoose";

const likeSchema = mongoose.Schema({
  name: { type: String, required: true },
  like: { type: Number, required: true },
});

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
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
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
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
  postVisibility: {
    type: String,
    required: true,
    default: true,
  },
  timestamp: {
    type: String,
  },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

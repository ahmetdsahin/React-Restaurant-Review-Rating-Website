import { Schema, model } from "mongoose";

const PostSchema = new Schema(
  {
    title: { type: String, required: true },
    caption: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    body: { type: Object, required: true },
    photo: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    tags: { type: [String] },
    tel: {type: [String]},
    like: {type: [String]},
    vote: {type: [String]},
    latitude:{type: [String]},
    longitude:{type: [String]},
    menu_url:{type: [String]},
  },
  { timestamps: true , toJSON: {virtuals: true}}
);

PostSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

const Post = model("Post", PostSchema);
export default Post;
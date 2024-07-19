
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { v4 as uuidv4 } from "uuid";


const createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: "Ali Ocakbaşı",
      caption: "Arap Camii Mh. Tersane Cd. Kardeşim Sk. Grifin Han No:45 K:4 Istanbul",
      slug: uuidv4(),
      body: {
        type: "doc",
        content: [],
      },
      photo: "https://s3-media0.fl.yelpcdn.com/bphoto/z4FbH7uqjJsI6a3MUQnRrg/o.jpg",
      tel:"0212 293 10 11",
      tags:"Barbeque ",
      like:"4.7",
      vote:"21",
      latitude:"41.010754",
      longitude:"28.975348",
      menu_url:["aliocakbasi.com"],

    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};


const getPost = async (req, res, next) => {
    try {
      const post = await Post.findOne({ slug: req.params.slug }).populate([
        {

            path: "user",
            select: ["avatar", "name"],
        },
        {
            path: "comments",
            match: {
            check: true,
            parent: null,
            },
            populate: [
                {
                  path: "user",
                  select: ["avatar", "name"],
                },
                {
                  path: "replies",
                  match: {
                    check: true,
                  },
                },
              ],
        },
        
      
         
    
    ]);
  
      if (!post) {
        const error = new Error("Post was not found");
        return next(error);
      }
  
      return res.json(post);
    } catch (error) {
      next(error);
    }
  };


const getAllPosts = async (req,res,next) =>{
  try {
    const posts = await Post.find({}).populate([
      {
        path: "user",
        select: ["avatar","name","verified"],
      }
    ]);
    res.json(posts);
  } catch (error) {
    next(error)
  }
}

export { createPost , getPost , getAllPosts};
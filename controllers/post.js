const post = require("../models/post");

const postFxn = {
    createPost: async (req,res) => {
        const {title,author,content} = req.body;
        try {
            if(!content) return res.status(400).json({message:"No content displayed"});
           const createdPost = await post.create({title,author,content});

           console.log(createdPost);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },
    getPost: async (req,res) => {
        try {
            const posts = await post.find()
            if(!posts) return res.json({message:"could not load content"})
            return res.status(200).json({message:posts});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    getPostById: async (req,res) => {
        const id = req.params.id
        try {
            const post = await post.findOne({_id:id});
        } catch ({error}) {
            res.status(500).json({message:error.message});

        }
    },
    updatePost:async (req,res) => {
        const id = req.params.id
        try {
            let {title,author,content,likes,shares,comments} = req.body;
            const updatedPost = await post.findOneAndUpdate(
                {_id:id},
                {$set:{
                    "title":title,
                    "content":content,
                    "likes":likes,
                    "shares":shares,
                    "comments":comments
                }}
            )
            res.status(201).json({
                message:"post Updated",
                data:updatedPost
            })
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    deletePost: async (req,res) => {
        const id = req.params.id;
        try {
            const deletedPost = await post.findByIdAndDelete(id)
            res.json({message:deletedPost});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    }
}

module.exports = postFxn;
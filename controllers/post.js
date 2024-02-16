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
            const updatedPost = await post.findOneAndUpdate(
                {_id:id},
                {$set:{}}
            )
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    }
}

module.exports = postFxn;
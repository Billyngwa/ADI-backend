const news = require("../models/news");

const newsFxn = {
    createNews: async (req,res) => {
        const {title,author,content} = req.body;
        try {
            if(!content) return res.status(400).json({message:"No content displayed"});
           const createdNews = await post.create({title,author,content});

           console.log(createdNews);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },
    getNews: async (req,res) => {
        try {
            const news = await post.find();
            if(!news) return res.json({message:"could not load content"})
            return res.status(200).json({message:news});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    getNewsById: async (req,res) => {
        const id = req.params.id;
        try {
            const news = await post.findOne({_id:id});
        } catch ({error}) {
            res.status(500).json({message:error.message});

        }
    },
    updateNews:async (req,res) => {
        const id = req.params.id;
        try {
            let {title,content,likes,shares,comments} = req.body;
            const updatedNews = await news.findOneAndUpdate(
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
                data:updatedNews
            })
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    deleteNews: async (req,res) => {
        const id = req.params.id;
        try {
            const deletedNews = await post.findByIdAndDelete(id)
            res.json({message:deletedNews});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    }
}

module.exports = newsFxn;
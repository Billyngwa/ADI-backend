const books = require("../models/book");

const bookFxn = {
    getBooks: async (req,res) => {
        try {
            const book = await books.find()
            if(!book) return res.json({message:"could not load content"})
            return res.status(200).json({message:book});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    getBookById: async (req,res) => {
        const id = req.params.id
        try {
            const book = await books.findOne({_id:id});
            return res.status(200).json({message:book});

        } catch ({error}) {
            res.status(500).json({message:error.message});

        }
    }
}

module.exports = bookFxn;
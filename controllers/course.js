const course = require("../models/course");

const courseFxn = {
    createCourse: async (req,res) => {
        const {courseTitle,author,content, courseCode} = req.body;
        try {
            if(!content) return res.status(400).json({message:"No content displayed"});
           const createdCourse = await course.create({courseTitle,author,content, courseCode});

           console.log(createdCourse);
        } catch (error) {
            res.status(500).json({message:error.message});
        }
    },
    getCourse: async (req,res) => {
        try {
            const course = await course.find();
            if(!course) return res.json({message:"could not load content"})
            return res.status(200).json({message:course});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    getCourseById: async (req,res) => {
        const id = req.params.id;
        try {
            const course = await course.findOne({_id:id});
            return res.status(200).json({message:course});

        } catch ({error}) {
            res.status(500).json({message:error.message});

        }
    },
    updateCourse:async (req,res) => {
        const id = req.params.id;
        try {
            let {courseTitle,content, courseCode} = req.body;
            const updatedCourse = await course.findOneAndUpdate(
                {_id:id},
                {$set:{
                    "CourseTitle":courseTitle,
                    "content":content,
                    "likes":likes,
                    "shares":shares,
                    "courseCode":courseCode
                }}
            )
            res.status(201).json({
                message:"post Updated",
                data:updatedCourse
            })
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    },
    deleteCourse: async (req,res) => {
        const id = req.params.id;
        try {
            const deletedCourse = await course.findByIdAndDelete(id)
            res.json({message:deletedCourse});
        } catch (error) {
            res.status(500).json({message:error.message});

        }
    }
}

module.exports = courseFxn;
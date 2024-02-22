const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/index');
const authRouter = require('./routes/index');
const postRoute = require("./routes/index");
nodemailer = require("nodemailer");
dotenv.config();
const app = express();

const port = process.env.PORT;

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('connection successful');
    }).catch((error) => {
        throw new Error(error.message);
    })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/user', router);
app.use("/posts?")
app.use(helmet());


app.get('/status', (req, res) => {
    res.setHeader("content-type", "application/json");
    const status = {
        "status": "Running..."
    };
    res.send(status);
});


app.listen(port, () => {
    console.log("app listening on :" + port)
});

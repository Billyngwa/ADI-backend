const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./routes/index');
const authRouter = require('./routes/index');
nodemailer = require("nodemailer");
dotenv.config();
const app = express();

const port = process.env.PORT;
console.log(process.env.URL);

mongoose.connect(process.env.URL)
    .then(() => {
        console.log('connection successful');
    }).catch((error) => {
        console.log('error occured');
        console.log('Error: ' + error);
    })

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authRouter);
app.use('/user', router);
app.use(helmet());


app.get('/status', (req, res) => {
    // res.setHeader("content-type","text/plain");
    res.setHeader("content-type", "application/json");
    const status = {
        "status": "Running..."
    };

    // res.json('hello world');
    res.send(status);
});


app.listen(port, () => {
    console.log("app listening on :" + port)
});

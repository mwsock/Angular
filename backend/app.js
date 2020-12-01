const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const postsRoutes = require('./routes/posts');

app.use('/images', express.static(path.join('backend/images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS')

    next();
})


try {
    mongoose.connect("mongodb+srv://mwsock:Bartolini2.@meancluster-hrniw.mongodb.net/AngularCourse?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("connected"));
} catch (error) {
    console.log("could not connect");
}

console.log(mongoose.connection.readyState);

app.use('/api/posts', postsRoutes);


module.exports = app;
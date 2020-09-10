const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Post = require('./models/post');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')

    next();
})


try {
    mongoose.connect("mongodb+srv://mwsock:Bartolini2.@meancluster-hrniw.mongodb.net/AngularCourse?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }, () =>
        console.log("connected"));
} catch (error) {
    console.log("could not connect");
}

console.log(mongoose.connection.readyState);

app.post('/api/posts', (req, res, next) => {
    console.log('Any')
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);

    post.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully!',
            postId: createdPost._id
        });

    })
})

app.get('/api/posts', (req, res, next) => {

    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Hello there!',
                posts: documents
            })
        });
});

app.delete('/api/posts/:id', (req, res, next) => {
    //console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        //  console.log('Deleted!')
        res.status(200).json({ message: 'Post Deleted!' }) //THIS SENDS INFO 'BOUT postId - idk how it works xD
    });
})

module.exports = app;
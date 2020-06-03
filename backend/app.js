const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS')

    next();
})

app.post('api/posts', (req, res, next) => {
    const post = req.body;
    console.log(post);
    res.status(201).json({
        message: 'Post added successfully!'
    })
})

app.use('/api/posts', (req, res, next) => {

    const post = [
        {
            id: 1,
            title: 'Some Content1',
            content: 'Some Author1'
        },
        {
            id: 2,
            title: 'Some Content2',
            content: 'Some Author2'
        }
    ]


    res.status(200).json({ message: 'Hello there!', posts: post });
});

module.exports = app;
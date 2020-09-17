const expres = require('express');
const Post = require('../models/post');

const router = expres.Router();

router.post('', (req, res, next) => {
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

router.get('', (req, res, next) => {

    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Hello there!',
                posts: documents
            })
        });
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        console.log(result);
        res.status(200).json({ message: 'Updated!' });
    })
})

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            console.log(post);
            res.status(200).json({ post });
        } else {
            res.status(400).json({ message: 'Post not found!' });
        }
    })
});

router.delete('/:id', (req, res, next) => {
    //console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        //  console.log('Deleted!')
        res.status(200).json({ message: 'Post Deleted!' }) //THIS SENDS INFO 'BOUT postId - idk how it works xD
    });
});

module.exports = router;
const expres = require('express');
const multer = require('multer');
const { title } = require('process');

const Post = require('../models/post');

const router = expres.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid MimeType');
        if (isValid) {
            error = null
        }
        cb(error, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('_');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '_' + Date.now() + '.' + ext);
    }
});

router.post('', multer({ storage: storage }).single('image'), (req, res, next) => {

    const url = req.protocol + '://' + req.headers.host;
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + '/images/' + req.file.filename
    });
    console.log(post);

    post.save().then(result => {
        res.status(201).json({
            message: 'Post added successfully!',
            post: {
                id: result.id,
                title: result.title,
                content: result.content,
                imagePath: result.imagePath
            }
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
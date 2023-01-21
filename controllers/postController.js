const cloudinary = require('../middlewares/cloudinary')
const Post = require('../models/Post')
const User = require('../models/User')  

exports.createPost = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path)

        const post = await Post.create({
            title: req.body.title,
            image: result.secure_url,
            cloudinaryId: result.public_id,
            user: req.user.id,
            userName: req.user.userName
        })
        await post.save()
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

exports.like = async (req, res) => {
    try {
        let findPost = await Post.find({ _id: req.params.id })
        if (findPost[0]['likes'].includes(req.user._id)) {
            let postLikes = findPost[0]['likes'].filter(user => user === req.user._id)
            await Post.findByIdAndUpdate(req.params.id, {
                likes: postLikes
            })
        } else {
            await Post.findByIdAndUpdate(req.params.id, {
                $push: { likes: req.user._id }
            },
                {
                    new: true
                }
            )
        }
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}
exports.postComment = async (req, res) => {
    try {
        const comment = {
            text: req.body.text,
            postedBy: req.user.userName
        }
        await Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: comment }
        }, {
            new: true
        })
        res.redirect('/')
    } catch (err) {
        console.log(err)
    }
}

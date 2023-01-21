const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const upload = require("../middlewares/multer");

router.post("/createPost", upload.single("image"), postController.createPost)
router.put("/like/:id", postController.like);
router.put("/postComment/:id", postController.postComment);

module.exports = router;
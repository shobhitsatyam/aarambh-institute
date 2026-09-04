const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route to get all categories
router.get('/categories', blogController.getCategories);

// Route to get all blogs with optional filtering/search
router.get('/', blogController.getBlogs);

// Route to get related posts
router.get('/related/:categoryId/:currentBlogId', blogController.getRelatedPosts);

// Route to get a single blog by ID and slug
router.get('/:id/:slug', blogController.getBlogByIdAndSlug);

module.exports = router;

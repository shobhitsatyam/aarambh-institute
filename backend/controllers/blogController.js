const pool = require('../config/db');

// @desc    Get all blogs (with optional search and category filter)
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    
    let query = `
      SELECT b.*, c.category_name 
      FROM blogs b 
      LEFT JOIN blog_categories c ON b.category_id = c.id 
      WHERE 1=1
    `;
    const queryParams = [];

    if (category && category !== 'all') {
      query += ` AND c.category_name = ?`;
      queryParams.push(category);
    }

    if (search) {
      query += ` AND (b.title LIKE ? OR b.short_description LIKE ?)`;
      queryParams.push(`%${search}%`, `%${search}%`);
    }

    if (sort === 'oldest') {
      query += ` ORDER BY b.created_at ASC`;
    } else if (sort === 'title-asc') {
      query += ` ORDER BY b.title ASC`;
    } else if (sort === 'title-desc') {
      query += ` ORDER BY b.title DESC`;
    } else {
      // default newest
      query += ` ORDER BY b.created_at DESC`;
    }

    const [rows] = await pool.query(query, queryParams);

    // Format date for frontend
    const formattedRows = rows.map(row => ({
      ...row,
      formatted_date: new Date(row.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    }));

    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Server error fetching blogs' });
  }
};

// @desc    Get a single blog by ID and Slug
// @route   GET /api/blogs/:id/:slug
// @access  Public
exports.getBlogByIdAndSlug = async (req, res) => {
  try {
    const { id, slug } = req.params;

    const query = `
      SELECT b.*, c.category_name 
      FROM blogs b 
      LEFT JOIN blog_categories c ON b.category_id = c.id 
      WHERE b.id = ? AND b.slug = ?
    `;

    const [rows] = await pool.query(query, [id, slug]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    const blog = rows[0];
    blog.formatted_date = new Date(blog.created_at).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });

    res.json(blog);
  } catch (error) {
    console.error('Error fetching blog details:', error);
    res.status(500).json({ message: 'Server error fetching blog details' });
  }
};

// @desc    Get all blog categories and count
// @route   GET /api/blogs/categories
// @access  Public
exports.getCategories = async (req, res) => {
  try {
    const query = `
      SELECT c.id, c.category_name, c.slug, COUNT(b.id) as post_count
      FROM blog_categories c
      LEFT JOIN blogs b ON c.id = b.category_id
      GROUP BY c.id
    `;
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error fetching categories' });
  }
};

// @desc    Get related posts based on category
// @route   GET /api/blogs/related/:categoryId/:currentBlogId
// @access  Public
exports.getRelatedPosts = async (req, res) => {
  try {
    const { categoryId, currentBlogId } = req.params;
    
    const query = `
      SELECT b.id, b.title, b.slug, b.featured_image, b.created_at, c.category_name 
      FROM blogs b 
      LEFT JOIN blog_categories c ON b.category_id = c.id 
      WHERE b.category_id = ? AND b.id != ?
      ORDER BY b.created_at DESC
      LIMIT 3
    `;

    const [rows] = await pool.query(query, [categoryId, currentBlogId]);
    
    const formattedRows = rows.map(row => ({
      ...row,
      formatted_date: new Date(row.created_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
      })
    }));

    res.json(formattedRows);
  } catch (error) {
    console.error('Error fetching related posts:', error);
    res.status(500).json({ message: 'Server error fetching related posts' });
  }
};

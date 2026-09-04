import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './BlogList.css';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filtering and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [activeTip, setActiveTip] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // Tips Carousel Logic
  const tips = [
    "Create a study schedule and stick to it consistently.",
    "Take regular breaks using the Pomodoro technique.",
    "Practice previous year question papers.",
    "Form study groups for better understanding."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/blogs/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (err) {
        console.error("Error fetching categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          category: activeCategory,
          sort: sortOrder,
          search: searchQuery
        });
        
        const response = await fetch(`http://localhost:5000/api/blogs?${queryParams}`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
          
          // Set featured blog (e.g. the first new one, or just the first one if all category is selected)
          if (activeCategory === 'all' && !searchQuery) {
             const featured = data.find(b => b.is_new === 'new') || data[0];
             setFeaturedBlog(featured);
          } else {
             setFeaturedBlog(null);
          }
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        console.error("Error fetching blogs", err);
        setError('Server error');
      } finally {
        setLoading(false);
      }
    };
    
    // Add a small debounce for search
    const delayDebounceFn = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [activeCategory, sortOrder, searchQuery]);

  const handleSearch = (e) => {
    // Search is handled automatically via useEffect dependency on searchQuery
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  const handleShare = async (id) => {
    const url = `${window.location.origin}/blog-single/${id}`;
    try {
      await navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link');
    }
  };

  return (
    <main className="blog-page-container">
      {/* Visually Hidden H1 for SEO */}
      <h1 className="sr-only" style={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>Aarambh Institute Blog & Study Materials</h1>
      
      {/* Featured Section */}
      {featuredBlog && !searchQuery && activeCategory === 'all' && (
        <section className="l360-featured-section">
          <div className="l360-featured-wrapper">
            <div className="l360-featured-label">
              <i className="fas fa-star-of-life"></i> Featured Article
            </div>
            <div className="l360-featured-grid">
              <div className="l360-featured-image">
                <img src={`/assets/images/${featuredBlog.featured_image}`} alt={featuredBlog.image_alt || featuredBlog.title} />
                <div className="l360-featured-category">{featuredBlog.category_name || 'Featured'}</div>
              </div>
              <div className="l360-featured-content">
                <div className="l360-featured-meta">
                  <span><i className="far fa-calendar-alt"></i> {featuredBlog.formatted_date}</span>
                  <span><i className="far fa-clock"></i> {Math.ceil(featuredBlog.content.length / 1500) || 5} min read</span>
                </div>
                <h2>{featuredBlog.title}</h2>
                <p>{featuredBlog.short_description?.substring(0, 180)}...</p>
                <div className="l360-featured-buttons">
                  <Link to={`/blog/${featuredBlog.id}/${featuredBlog.slug}`} className="l360-featured-btn">
                    Read Article <i className="fas fa-arrow-right"></i>
                  </Link>
                  <button className="l360-share-btn" onClick={() => handleShare(featuredBlog.id)}>
                    <i className="fas fa-share-alt"></i> Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="l360-allblogs-section">
        <div className="l360-allblogs-wrapper">
          <nav aria-label="Blog Category Filters" className="l360-blog-filter">
            <header className="l360-filter-header">
              <h2><i className="fas fa-filter"></i> Browse by Category</h2>
            </header>
            <div className="l360-filter-tabs" role="tablist">
              <button
                role="tab"
                aria-selected={activeCategory === 'all'}
                className={`l360-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                <i className="fas fa-th-large"></i> All Posts
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`l360-filter-btn ${activeCategory === cat.category_name ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.category_name)}
                >
                  {cat.category_name} <span className="filter-count">({cat.post_count})</span>
                </button>
              ))}
            </div>
            <div className="l360-filter-actions">
              <div className="l360-blog-search">
                <i className="fas fa-search" aria-hidden="true"></i>
                <input
                  type="search"
                  aria-label="Search articles"
                  placeholder="Search articles, topics, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
              <div className="l360-blog-sort">
                <select 
                  aria-label="Sort articles"
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title-asc">Title A-Z</option>
                  <option value="title-desc">Title Z-A</option>
                </select>
              </div>
            </div>
          </nav>

          <div className="l360-blog-layout">
            <div className="l360-blog-main">
              {loading ? (
                <div className="no-results">
                  <i className="fas fa-spinner fa-spin"></i>
                  <h3>Loading Articles...</h3>
                </div>
              ) : error ? (
                <div className="no-results">
                  <i className="fas fa-exclamation-triangle" style={{color: 'var(--blog-accent)'}}></i>
                  <h3>Oops!</h3>
                  <p>{error}</p>
                </div>
              ) : blogs.length > 0 ? (
                <div className="l360-allblogs-grid" role="feed" aria-busy="false">
                  {blogs.map((blog) => (
                    <article className="l360-blog-card" key={blog.id} aria-labelledby={`blog-title-${blog.id}`}>
                      <div className="l360-blog-image">
                        <img src={`/assets/images/${blog.featured_image}`} alt={blog.image_alt || blog.title} loading="lazy" />
                        <div className="l360-blog-category">{blog.category_name || 'Uncategorized'}</div>
                        {blog.is_new === 'new' && <div className="l360-blog-new-badge">NEW</div>}
                      </div>
                      <div className="l360-blog-card-content">
                        <div className="l360-blog-meta">
                          <span><i className="far fa-calendar"></i> {blog.formatted_date}</span>
                          <span><i className="far fa-clock"></i> {blog.read_time} min read</span>
                        </div>
                        <h3 className="l360-blog-post-title">
                          <Link to={`/blog/${blog.id}/${blog.slug}`}>{blog.title}</Link>
                        </h3>
                        <p className="l360-blog-excerpt">
                          {blog.short_description?.substring(0, 120)}...
                        </p>
                        <div className="l360-blog-footer">
                          <Link to={`/blog/${blog.id}/${blog.slug}`} className="l360-blog-read-link" aria-label={`Read more about ${blog.title}`}>
                            Read More <i className="fas fa-arrow-right" aria-hidden="true"></i>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <i className="fas fa-search"></i>
                  <h3>No Articles Found</h3>
                  <p>We couldn't find any articles matching your search criteria.</p>
                </div>
              )}
            </div>

            <aside className="l360-blog-sidebar">
              <div className="l360-sidebar-widget l360-about-widget">
                <div className="about-icon"><i className="fas fa-graduation-cap"></i></div>
                <h3>About Our Blog</h3>
                <p>Your go-to resource for exam preparation tips, study strategies, and educational insights.</p>
              </div>

              <div className="l360-sidebar-widget l360-tips-widget">
                <h3 className="widget-title"><i className="fas fa-lightbulb"></i> Quick Study Tips</h3>
                <div className="tips-carousel">
                  <div className="tip-item active">
                    <i className="fas fa-check-circle"></i>
                    <p>{tips[activeTip]}</p>
                  </div>
                </div>
                <button className="tip-next-btn" onClick={() => setActiveTip((prev) => (prev + 1) % tips.length)}>
                  <i className="fas fa-chevron-right"></i>
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BlogList;
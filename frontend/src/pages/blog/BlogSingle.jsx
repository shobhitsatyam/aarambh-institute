import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import './BlogSingle.css';

const BlogSingle = () => {
  const { id, slug } = useParams();

  // States for data (To be populated via your Node.js API later)
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [toc, setToc] = useState([]);
  const contentRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Blog Data
  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}/${slug}`);
        if (!response.ok) {
          throw new Error('Blog not found');
        }
        const data = await response.json();
        setBlog(data);

        // Fetch related blogs based on category
        if (data.category_id) {
          const relatedRes = await fetch(`http://localhost:5000/api/blogs/related/${data.category_id}/${data.id}`);
          if (relatedRes.ok) {
            const relatedData = await relatedRes.json();
            setRelatedBlogs(relatedData);
          }
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
        setError("Failed to load blog post. It may have been removed or does not exist.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogData();
  }, [id, slug]);

  useEffect(() => {
    if (contentRef.current) {
      const headings = Array.from(contentRef.current.querySelectorAll('h2, h3'));
      const tocItems = headings.map((heading, index) => {
        const headingId = `heading-${index}`;
        heading.id = headingId;
        return {
          id: headingId,
          text: heading.innerText,
          level: heading.tagName.toLowerCase()
        };
      });
      setToc(tocItems);
    }
  }, [blog]);

  const handleShare = (platform) => {
    const currentUrl = encodeURIComponent(window.location.href);
    const currentTitle = encodeURIComponent(blog?.title || document.title);
    let shareUrl = '';

    switch (platform) {
      case 'facebook': shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`; break;
      case 'twitter': shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${currentTitle}`; break;
      case 'linkedin': shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${currentTitle}`; break;
      case 'whatsapp': shareUrl = `https://wa.me/?text=${currentTitle}%20${currentUrl}`; break;
      case 'copy':
        navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
        return;
      default: return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  // If data is still loading or errored
  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fas fa-spinner fa-spin" style={{ fontSize: '40px', color: 'var(--blog-accent)', marginBottom: '20px' }}></i>
        <h2>Loading Article...</h2>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{ textAlign: 'center', padding: '150px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <i className="fas fa-exclamation-triangle" style={{ fontSize: '50px', color: 'var(--blog-accent)', marginBottom: '20px' }}></i>
        <h2 style={{ fontSize: '32px', marginBottom: '15px' }}>Oops!</h2>
        <p style={{ fontSize: '18px', color: 'var(--blog-text-muted)', marginBottom: '30px' }}>{error || "Blog post not found"}</p>
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--blog-accent)', color: 'white', padding: '12px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700' }}>
          <i className="fas fa-arrow-left"></i> Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="l360-blog-single-banner">
        <div className="l360-blog-single-banner-wrapper">
          <div className="l360-blog-single-category">
            <Link to={`/blog?category=${encodeURIComponent(blog.category_name)}`}>
              <i className="fas fa-folder"></i> {blog.category_name || 'Uncategorized'}
            </Link>
          </div>
          <h1>{blog.title}</h1>
          <div className="l360-blog-single-meta">
            <span><i className="far fa-calendar-alt"></i> {blog.formatted_date}</span>
            <span><i className="far fa-clock"></i> {Math.ceil(blog.content.length / 1200)} min read</span>
          </div>
          <div className="l360-blog-breadcrumb">
            <Link to="/">Home</Link> <i className="fas fa-chevron-right"></i>
            <Link to="/blog">Blog</Link> <i className="fas fa-chevron-right"></i>
            <Link to={`/blog?category=${encodeURIComponent(blog.category_name)}`}>{blog.category_name || 'Uncategorized'}</Link> <i className="fas fa-chevron-right"></i>
            <span>{blog.title.substring(0, 50)}</span>
          </div>
        </div>
      </section>

      <article className="l360-blog-single-content">
        <div className="l360-blog-single-layout">
          <div className="l360-blog-single-main">
            {blog.featured_image && (
              <div className="l360-blog-single-featured-image">
                <img src={`/assets/images/${blog.featured_image}`} alt={blog.image_alt || blog.title} />
              </div>
            )}

            <div className="l360-blog-single-body">
              {blog.short_description && (
                <div className="l360-blog-excerpt-box">
                  <i className="fas fa-quote-left"></i>
                  <p>{blog.short_description}</p>
                </div>
              )}

              <div
                className="l360-blog-content-main"
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>

            {blog.keywords && (
              <div className="l360-blog-tags-section">
                <h4><i className="fas fa-tags"></i> Tags:</h4>
                <div className="l360-tags-list">
                  {blog.keywords.split(',').map((keyword, index) => (
                    keyword.trim() && (
                      <Link key={index} to={`/blog?search=${encodeURIComponent(keyword.trim())}`}>
                        #{keyword.trim()}
                      </Link>
                    )
                  ))}
                </div>
              </div>
            )}

            <div className="l360-blog-share-section">
              <h4><i className="fas fa-share-alt"></i> Share this article:</h4>
              <div className="l360-share-buttons">
                <button className="share-btn share-facebook" onClick={() => handleShare('facebook')}><i className="fab fa-facebook-f"></i></button>
                <button className="share-btn share-twitter" onClick={() => handleShare('twitter')}><i className="fab fa-twitter"></i></button>
                <button className="share-btn share-linkedin" onClick={() => handleShare('linkedin')}><i className="fab fa-linkedin-in"></i></button>
                <button className="share-btn share-whatsapp" onClick={() => handleShare('whatsapp')}><i className="fab fa-whatsapp"></i></button>
                <button className="share-btn share-copy" onClick={() => handleShare('copy')}><i className="fas fa-link"></i></button>
              </div>
            </div>
          </div>

          <aside className="l360-blog-single-sidebar">
            <div className="l360-sidebar-widget l360-author-widget">
              <div className="author-avatar"><i className="fas fa-user-graduate"></i></div>
              <h3>About the Author</h3>
              <p>Education expert with years of experience in helping students succeed in distance learning and open schooling examinations.</p>
            </div>

            {toc.length > 0 && (
              <div className="l360-sidebar-widget l360-table-widget">
                <h3 className="widget-title"><i className="fas fa-list-ul"></i> Table of Contents</h3>
                <div className="table-of-contents">
                  <ul>
                    {toc.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          style={{
                            marginLeft: item.level === 'h3' ? '15px' : '0',
                            fontWeight: item.level === 'h2' ? '600' : '400'
                          }}
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(item.id).scrollIntoView({ behavior: 'smooth' });
                          }}
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            <div className="l360-sidebar-widget l360-newsletter-widget">
              <div className="newsletter-icon"><i className="fas fa-envelope-open-text"></i></div>
              <h3>Get Study Tips</h3>
              <p>Subscribe to get exam preparation tips directly in your inbox.</p>
              <form className="sidebar-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit">Subscribe</button>
              </form>
              <p className="newsletter-note">No spam, unsubscribe anytime.</p>
            </div>
          </aside>
        </div>
      </article>

      {relatedBlogs.length > 0 && (
        <section className="l360-related-posts">
          <div className="l360-related-posts-wrapper">
            <div className="l360-related-posts-header">
              <h3><i className="fas fa-book-open"></i> You Might Also Like</h3>
            </div>
            <div className="l360-related-posts-grid">
              {relatedBlogs.map((related) => (
                <div className="l360-related-post-card" key={related.id}>
                  <div className="l360-related-post-image">
                    <img src={`/assets/images/${related.featured_image}`} alt={related.title} />
                  </div>
                  <div className="l360-related-post-content">
                    <div className="l360-related-post-date">
                      <i className="far fa-calendar-alt"></i> {related.formatted_date}
                    </div>
                    <h4>
                      <Link to={`/blog/${related.id}/${related.slug}`}>{related.title}</Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogSingle;
/**
 * NextBlog configuration
 * This file is used to configure the NextBlog package
 */
module.exports = {
  /**
   * Directory where blog posts are stored
   * Default: 'posts'
   */
  postsDir: 'posts',
  
  /**
   * Base path for the blog
   * Default: '/blog'
   */
  basePath: '/blog',
  
  /**
   * Number of posts to show per page (for pagination)
   * Default: 10
   */
  postsPerPage: 10,
  
  /**
   * Default reading speed (words per minute) for calculating reading time
   * Default: 200
   */
  wordsPerMinute: 200,
  
  /**
   * Maximum length of post excerpts
   * Default: 150
   */
  excerptLength: 150,
  
  /**
   * Date format for displaying post dates
   * Default: 'YYYY-MM-DD'
   */
  dateFormat: 'YYYY-MM-DD',
  
  /**
   * Enable or disable features
   */
  features: {
    /**
     * Enable or disable tag system
     * Default: true
     */
    tags: true,
    
    /**
     * Enable or disable reading time estimation
     * Default: true
     */
    readingTime: true,
    
    /**
     * Enable or disable MDX support
     * Default: true
     */
    mdx: true,
    
    /**
     * Enable or disable social sharing buttons
     * Default: true
     */
    socialSharing: true
  }
}; 
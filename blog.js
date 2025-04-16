const blogContainer = document.getElementById('blog-container');
const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];

if (blogPosts.length === 0) {
  blogContainer.innerHTML = "<p>No blog posts found.</p>";
} else {
  blogPosts.forEach(post => {
    const blogEl = document.createElement('div');
    blogEl.classList.add('blog-post');

    blogEl.innerHTML = `
      <h3>${post.title}</h3>
      <div class="date">${post.date}</div>
      <p>${post.content.slice(0, 100)}...</p>
    `;

    blogContainer.appendChild(blogEl);
  });
}


const form = document.getElementById("blog-form");
  const postList = document.getElementById("post-list");

  let posts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  function saveToLocal() {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
    renderPosts();
  }

  function renderPosts() {
    postList.innerHTML = "";
    posts.forEach((post, index) => {
      const postEl = document.createElement("div");
      postEl.className = "post-item";
      postEl.innerHTML = `
        <h4>${post.title}</h4>
        <p><strong>Date:</strong> ${post.date}</p>
        <p>${post.content.slice(0, 80)}...</p>
        <div class="post-actions">
          <button class="edit-btn" onclick="editPost(${index})">Edit</button>
          <button class="delete-btn" onclick="deletePost(${index})">Delete</button>
        </div>
      `;
      postList.appendChild(postEl);
    });
  }

  function editPost(index) {
    const post = posts[index];
    document.getElementById("post-index").value = index;
    document.getElementById("blog-title").value = post.title;
    document.getElementById("blog-date").value = post.date;
    document.getElementById("blog-content").value = post.content;
  }

  function deletePost(index) {
    if (confirm("Delete this post?")) {
      posts.splice(index, 1);
      saveToLocal();
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const index = document.getElementById("post-index").value;
    const title = document.getElementById("blog-title").value;
    const date = document.getElementById("blog-date").value;
    const content = document.getElementById("blog-content").value;

    const newPost = { title, date, content };

    if (index === "") {
      posts.unshift(newPost); // New post
    } else {
      posts[index] = newPost; // Edited post
    }

    form.reset();
    document.getElementById("post-index").value = "";
    saveToLocal();
  });

  renderPosts();


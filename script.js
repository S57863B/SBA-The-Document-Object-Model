const form = document.getElementById('blog-form');
const titleInput = document.getElementById('post-title');
const contentInput = document.getElementById('post-content');
const postsContainer = document.getElementById('posts-container');
const editIdInput = document.getElementById('edit-id');
const submitBtn = document.getElementById('submit-btn');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

let posts = JSON.parse(localStorage.getItem('myBlogPosts')) || [];
renderPosts();

form.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const titleValue = titleInput.value.trim();
    const contentValue = contentInput.value.trim();

    if (!titleValue || !contentValue) return;

    const editingId = editIdInput.value;

    if (editingId) {
        const postIndex = posts.findIndex(p => p.id === editingId);
        if (postIndex !== -1) {
            posts[postIndex].title = titleValue;
            posts[postIndex].content = contentValue;
        }
    } else {
        const newPost = {
            id: Date.now().toString(36) + Math.random().toString(36).substr(2),
            title: titleValue,
            content: contentValue,
            timestamp: new Date().toLocaleString()
        };
        posts.unshift(newPost);
    }
    saveToLocalStorage();
    renderPosts();
    resetFormState();
});

cancelEditBtn.addEventListener('click', resetFormState);
postsContainer.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        const postId = event.target.getAttribute('data-id');
        deletePost(postId);
    }
    
    if (event.target.classList.contains('edit-btn')) {
        const postId = event.target.getAttribute('data-id');
        populateEditForm(postId);
    }
});

function deletePost(id) {
    posts = posts.filter(post => post.id !== id);
    
    saveToLocalStorage();
    renderPosts();
    
    if (editIdInput.value === id) {
        resetFormState();
    }
}

function populateEditForm(id) {
    const postToEdit = posts.find(post => post.id === id);
    if (!postToEdit) return;

    titleInput.value = postToEdit.title;
    contentInput.value = postToEdit.content;
    editIdInput.value = postToEdit.id;

    submitBtn.textContent = 'Update Post';
    cancelEditBtn.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function saveToLocalStorage() {
    localStorage.setItem('myBlogPosts', JSON.stringify(posts));
}

function resetFormState() {
    form.reset();
    editIdInput.value = '';
    submitBtn.textContent = 'Publish Post';
    cancelEditBtn.classList.add('hidden');
}

function renderPosts() {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = '<p>No posts yet. Start writing above!</p>';
        return;
    }

    posts.forEach(post => {
        const postElement = document.createElement('article');
        postElement.classList.add('post-card');
        postElement.innerHTML = `
            <div class="post-header">
                <h3 class="post-title">${post.title}</h3>
                <span class="post-date">${post.timestamp}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <button class="edit-btn" data-id="${post.id}">Edit</button>
                <button class="delete-btn" data-id="${post.id}">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}
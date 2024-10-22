import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('newPostBtn');
  const newPostForm = document.getElementById('newPostForm');
  const postForm = document.getElementById('postForm');

  newPostBtn.addEventListener('click', () => {
    newPostForm.style.display = 'block';
  });

  postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const body = quill.root.innerHTML;

    await backend.createPost(title, body, author, tags);
    newPostForm.style.display = 'none';
    postForm.reset();
    quill.setContents([]);
    await displayPosts();
  });

  await displayPosts();
  initMatrixBackground();
});

async function displayPosts() {
  const postsSection = document.getElementById('posts');
  const posts = await backend.getPosts();
  
  postsSection.innerHTML = '';
  posts.sort((a, b) => b.timestamp - a.timestamp).forEach(post => {
    const article = document.createElement('article');
    article.innerHTML = `
      <h2>${post.title}</h2>
      <p class="author">Committed by ${post.author}</p>
      <div class="content">${post.body}</div>
      <p class="timestamp">${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
      <p class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ')}</p>
    `;
    postsSection.appendChild(article);
  });
}

function initMatrixBackground() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  document.getElementById('matrix-bg').appendChild(canvas);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const columns = canvas.width / 20;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = '15px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = String.fromCharCode(Math.random() * 128);
      ctx.fillText(text, i * 20, drops[i] * 20);

      if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      drops[i]++;
    }
  }

  setInterval(draw, 33);
}

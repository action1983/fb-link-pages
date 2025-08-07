document.addEventListener('DOMContentLoaded', () => {
  const cardGrid = document.querySelector('.card-grid');
  const searchInput = document.getElementById('search-input');

  const renderPosts = (postsToRender, query = '') => {
    cardGrid.innerHTML = '';

    if (postsToRender.length === 0) {
      cardGrid.innerHTML = '<p>검색 결과가 없습니다.</p>';
      return;
    }

    postsToRender.forEach(post => {
      const card = document.createElement('div');
      card.className = 'card';

      const title = highlightText(post.title, query);
      const description = highlightText(post.description, query);
      const tags = post.tags.map(tag => `<span class="tag">${highlightText(tag, query)}</span>`).join('');

      card.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        <div class="tags">${tags}</div>
      `;
      cardGrid.appendChild(card);
    });
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  const filterPosts = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filteredPosts = posts.filter(post => {
      return (
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.description.toLowerCase().includes(lowerCaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
      );
    });
    renderPosts(filteredPosts, query);
  };

  searchInput.addEventListener('input', (e) => {
    filterPosts(e.target.value);
  });

  // Initial render
  renderPosts(posts);
});

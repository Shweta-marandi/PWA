const apiKey = 'cfb03a464d7d4652897d8093c549b270';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;

    sourceSelector.addEventListener('change', e => {
      updateNews(e.target.value);
    });

  /*  if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register('sw.js');
            console.log(`SW registered`);
        } catch (error) {
            console.log(`SW reg failed`);
        }
    }*/
});

async function updateSources() {
    const res = await fetch(`https://newsapi.org/v2/sources`);
    const json = await response.json();

    sourceSelector.innerHTML = json.sources
    .map(src => `<option value="${src.id}">${src.name}</option>`)
        .join('\n');
}

async function updateNews(source = defaultSource) {
    const response = await fetch('https://newsapi.org/v2/top-headlines?country=${source}&apiKey=${apiKey}`);
    const json = await response.json();
    
    main.innerHTML = json.articles.map(createArticle).join('\n');
    }

    function createArticle(article) {
      return `
        <div class="article">
          <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
            <p>${article.description}</p>
          </a>
        </div>
      `;
    }
